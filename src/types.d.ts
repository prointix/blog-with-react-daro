export type IUser = {
  email: string;
  password: string;
}
export interface IAuthContext {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  error: {
    message: string;
  };
  logout: () => void;
  login: (data: IAuthResponse) => void;
}

export type IAuthResponse= {
  token: string;
  user: IUser;
}


export interface AuthProviderProps{
  children: ReactNode;
}
