import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import ProtectedLoggedRoute from "./components/ProtectedLoggedRoute";

import { Home } from "./pages/Home";
import Login from "./pages/Login";
import EditPost from "./pages/Posts/Edit";
import NewPost from "./pages/Posts/new";
import ShowPost from "./pages/Posts/Show";
import Register from "./pages/Register";
import Loading from "./pages/Loading";

// TODO: Setup router here

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedLoggedRoute />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>
        <Route path="/single-article/:id" element={<ShowPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/new" element={<NewPost />} />
      </Routes>
    </div>
  );
}

export default App;
