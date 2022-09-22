import {
  default as React,
  createContext,
  Dispatch,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
import { IAuthContext, IAuthResponse, IUser } from "../types";
import api from "../utils/api";

type AppState = typeof INITIAL_STATE;

type Action =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "LOGIN_FAILURE"; payload: any }
  | { type: "LOGOUT" };

interface UserContextProviderProps {
  children: React.ReactNode;
}

const INITIAL_STATE: IAuthContext = {
  signed: false,
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  loading: false,
  error: false,
  login: (data: IAuthResponse) => {},
  logout: () => {},
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        signed: true,
        loading: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        signed: true,
        user: action.payload,
        loading: false,
        error: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        signed: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        signed: false,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({ state: INITIAL_STATE, dispatch: () => {} });

const AuthProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    api
      .get<IUser>("/auth/me")
      .then((response) => {
        setUser(response.data);
        return user;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
//custome hook
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
