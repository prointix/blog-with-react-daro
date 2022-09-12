import { useAuth } from "../contexts/auth";

/**
 * TODO: Create protect router and use context with `react router dom`
 * */

function ProtectedRoute() {
  const {} = useAuth();

  return <div>ProtectedRoute</div>;
}

export default ProtectedRoute;
