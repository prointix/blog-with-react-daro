import { ReactNode } from "react";
import {
  createContext,
   Dispatch,
  useEffect,
  useReducer,
} from "react";

import { IAuthContext, AuthProviderProps } from "../types";

// TODO: Create authentication context
type AppState = typeof INITIAL_STATE;

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  loading: false,
  error: 
  {
    message:""
  },
  dispatch: (() => undefined) as Dispatch<any>,
};

type Action =
| { type: "LOGIN_START" }
| { type: "LOGIN_SUCCESS"; payload: any }
| { type: "LOGIN_FAILURE"; payload: any }
| { type: "LOGOUT" };

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: action.payload,
      
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }:AuthProviderProps ) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
};

// TODO: Create custom auth hook
export const AuthContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({ state: INITIAL_STATE, dispatch: () => {} });

// export const useAuth = () => ({});
