import {
  default as React,
  createContext,
   Dispatch,
  useReducer,

} from "react";
import { IAuthContext, IAuthResponse } from "../types";


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
  signed:false,
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  loading: false,
  error: false,
  dispatch: (() => undefined) as Dispatch<any>,
  login: (data: IAuthResponse) => {},
  logout: () => {},
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        signed: false,
        user: null,
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

  // create login function as a props
  // const login = (data: IAuthResponse) => {
  //   dispatch({ type: "LOGIN_START" });
  //   try {
  //     dispatch({ type: "LOGIN_SUCCESS", payload: data });
  //     localStorage.setItem("user", JSON.stringify(data));
  //   } catch (error) {
  //     dispatch({ type: "LOGIN_FAILURE", payload: error });
  //   }
  // };
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}



export { AuthContext, AuthProvider };


