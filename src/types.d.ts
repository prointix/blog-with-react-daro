export interface IAuthContext {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  logout: () => void;
  login: (data: IAuthResponse) => void;
}
