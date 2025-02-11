import axios from "axios";
// import { logout } from "@/configs/firebase/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log({ instance });

const fileInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Uncomment and modify the interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const path = window.location.pathname;
    if (
      error.response &&
      error.response.status === 401 &&
      path !== "/expired-session"
    ) {
      // logout();
      console.log("logout");
    }
    return Promise.reject(error);
  }
);

const GET = async (
  endpoint: string,
  param: any = {},
  responseType: any = "json"
) => {
  return instance
    .get(endpoint, {
      params: { ...param },
      responseType: responseType,
    })
    .then((response: any) => response)
    .catch((error) => {
      throw error;
    });
};

const PUT = async (
  endpoint: string,
  data: any = {},
  param: any = {},
  responseType: any = "json"
) => {
  return instance
    .put(endpoint, data, {
      params: { ...param },
      responseType: responseType,
    })
    .then((response: any) => response)
    .catch((error) => {
      throw error;
    });
};

const PATCH = async (
  endpoint: string,
  data: any = {},
  param: any = {},
  responseType: any = "json"
) => {
  return instance
    .patch(endpoint, data, {
      params: { ...param },
      responseType: responseType,
    })
    .then((response: any) => response)
    .catch((error) => {
      throw error;
    });
};

const POST = async (
  endpoint: string,
  data: any = {},
  param: any = {},
  responseType: any = "json"
) => {
  return instance
    .post(endpoint, data, {
      params: { ...param },
      responseType: responseType,
    })
    .then((response: any) => response)
    .catch((error) => {
      throw error;
    });
};

const DELETE = async (
  endpoint: string,
  param: any = {},
  responseType: any = "json"
) => {
  return instance
    .delete(endpoint, {
      params: { ...param },
      responseType: responseType,
    })
    .then((response: any) => response)
    .catch((error) => {
      throw error;
    });
};

const axiosManager = { GET, POST, PUT, PATCH, DELETE, instance, fileInstance };

export { axiosManager };
