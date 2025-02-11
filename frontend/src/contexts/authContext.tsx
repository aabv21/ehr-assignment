import { createContext, useEffect, useState, useCallback } from "react";
import { auth } from "../configs/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { getUserFile, getUserInfo } from "../services/userServices";
import { AuthContextType } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { axiosManager } from "../services/axiosManager";

type ImageFetchResult =
  | { status: "fulfilled"; key: string; value: File }
  | { status: "rejected"; key: string; reason: any }
  | { status: "skipped"; key: string };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision["userEvent"] ?? 0
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshToken = useCallback(async (user: User | null) => {
    if (!user) return null;
    try {
      const token = await user.getIdToken(true);
      localStorage.setItem("accessToken", token);
      setAccessToken(token);

      // Update the axios instance with the new token
      axiosManager.instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosManager.fileInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }, []);

  const initializeUser = useCallback(
    async (user: User | null) => {
      if (user) {
        const token = await refreshToken(user);
        if (!token) {
          // Handle token refresh failure
          setCurrentUser(null);
          setUserLoggedIn(false);
          setLoading(false);
          return;
        }

        const userId = user.uid;
        const userData = await getUserInfo(userId);

        // Fetch identification and signature images
        const imagePromises = [
          {
            url: userData.identificationImageUrl,
            fileName: "identification",
            key: "identificationImage",
          },
          {
            url: userData.signatureImageUrl,
            fileName: "signature",
            key: "signatureImage",
          },
        ].map(async ({ url, fileName, key }): Promise<ImageFetchResult> => {
          if (url) {
            try {
              const file = await getFileFromUrl(userId, url, fileName);
              return { status: "fulfilled", key, value: file };
            } catch (error) {
              console.error(`Error fetching ${key}:`, error);
              return { status: "rejected", key, reason: error };
            }
          }
          return { status: "skipped", key };
        });

        const results = await Promise.allSettled(imagePromises);
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const { key, value } = result.value as { key: string; value: File };
            userData[key] = value;
          } else if (result.status === "rejected") {
            const { key, reason } = result.value as {
              key: string;
              reason: any;
            };
            console.error(`Failed to fetch ${key}`, reason);
          }
        });

        localStorage.setItem("userId", JSON.stringify(userId));
        setCurrentUser({ ...user, ...userData });
        setUserLoggedIn(true);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    },
    [refreshToken]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed", user);
      await initializeUser(user);
    });

    return () => unsubscribe();
  }, [initializeUser, userEvent]);

  const getFileFromUrl = async (
    userId: string,
    url: string,
    fileName: string
  ) => {
    const response = await getUserFile(userId, url);
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    const file = new File([blob], fileName, {
      type: blob.type,
    });
    return file;
  };

  const value = {
    currentUser,
    accessToken,
    userLoggedIn,
    loading,
    refreshToken: () => refreshToken(auth.currentUser),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextType | null>(null);
