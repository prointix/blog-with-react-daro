import { useAuth } from "../contexts/auth";
import { Navigate, Outlet } from "react-router-dom";

// TODO: Setup prevent user access login when they already login
type Props = {
  children?: JSX.Element;
};

function ProtectedLoggedRoute({ children }: Props) {
  const { signed } = useAuth();

  if (signed) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedLoggedRoute;
