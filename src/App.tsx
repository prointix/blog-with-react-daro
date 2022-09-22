import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostItem } from "./components/PostItem";
import { AuthProvider } from "./contexts/auth";

import { Home } from "./pages/Home";
import Login from "./pages/Login";
import EditPost from "./pages/Posts/Edit";
import ShowPost from "./pages/Posts/Show";
import Register from "./pages/Register";

// TODO: Setup router here

function App() {
  return (
    <div className="container-app">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/single-article/:id" element={<ShowPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
