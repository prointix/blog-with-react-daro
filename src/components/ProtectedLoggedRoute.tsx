import { useAuth } from "../contexts/auth";

// TODO: Setup prevent user access login when they already login

function ProtectedLoggedRoute() {
  const {} = useAuth();

  return <div>ProtectedLoggedRoute</div>;
}

export default ProtectedLoggedRoute;
