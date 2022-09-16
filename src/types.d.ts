export type IUser = {
  email: string;
  password: string;
}
export interface IAuthContext {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  error: boolean;
  logout: () => void;
  login: (data: IAuthResponse) => void;
  dispatch: React.Dispatch<any>;
}

export type IAuthResponse= {
  token: string;
  user: IUser;
}


