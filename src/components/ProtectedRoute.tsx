import { useAuth } from "../contexts/auth";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  children?: JSX.Element;
};

export function ProtectedRoute({ children }: Props) {
  const { state } = useAuth();

  if (state.signed === false) {
    return <Navigate to="/signin" replace />;
  }
  return children ? children : <Outlet />;
}
