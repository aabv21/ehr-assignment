// Dependencies
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

// Pages
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import HomePage from "./pages/HomePage.tsx";

// Components
import PublicRoutes from "@/components/router/PublicRoutes.tsx";

// Contexts
// import { AuthProvider } from "./contexts/authContext";
import { DialogProvider } from "@/contexts/dialogContext";
import { ConfirmDialogProvider } from "@/contexts/confirmDialogContext.tsx";
import { Toaster } from "@/components/ui/toaster";

// Services
import store from "./store/index.ts";

const App = () => {
  return (
    <Provider store={store}>
      <Toaster />
      <DialogProvider>
        <ConfirmDialogProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="login"
                element={<PublicRoutes component={SignInPage} />}
              />
              <Route
                path="signup"
                element={<PublicRoutes component={SignUpPage} />}
              />
              <Route
                path="/"
                element={<PublicRoutes title="Home" component={HomePage} />}
              />
            </Routes>
          </BrowserRouter>
        </ConfirmDialogProvider>
      </DialogProvider>
    </Provider>
  );
};

export default App;
