import {
  default as React,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { IAuthContext, IAuthResponse, IUser } from "../types";
import api from "../utils/api";

interface UserContextProviderProps {
  children: React.ReactNode;
}

// // const INITIAL_STATE: IAuthContext = {
// //   signed: false,
// //   user: null,
// //   loading: false,
// //   error: false,
// //   login: (data: IAuthResponse) => {},
// //   logout: () => {},
// // };

// // //checka if token in localstorage exist

// // const reducer = (state: AppState, action: Action) => {
// //   switch (action.type) {
// //     case "LOGIN_START":
// //       return {
// //         ...state,
// //         signed: true,
// //         loading: true,
// //         error: false,
// //       };

// //     case "LOGIN_SUCCESS":
// //       return {
// //         ...state,
// //         signed: true,
// //         user: action.payload,
// //         loading: false,
// //         error: action.payload,
// //       };
// //     case "LOGIN_FAILURE":
// //       return {
// //         ...state,
// //         user: null,
// //         loading: false,
// //         error: action.payload,
// //       };
// //     case "LOGOUT":
// //       return {
// //         ...state,
// //         user: null,
// //         loading: false,
// //         error: null,
// //       };
// //     default:
// //       return state;
// //   }
// // };

const AuthContext = createContext<IAuthContext>({
  signed: false,
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = (data: IAuthResponse) => {
    setUser(data.user);
    localStorage.setItem("token", data.accessToken);
    api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  };

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    api.defaults.headers.common.Authorization = "";
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    setLoading(true);
    api
      .get<IUser>("/auth/me")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          setLoading(false);
        }
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signed: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//custome hook
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
