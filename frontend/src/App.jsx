import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import EditBlog from "./pages/admin/EditBlog";
import Comments from "./pages/admin/Comments";
import UnifiedLogin from "./components/UnifiedLogin";
import Register from "./components/Register";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { token, userType } = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<UnifiedLogin />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Admin routes - accessible to both admin and user roles */}
        <Route path="/admin" element={token ? <Layout /> : <UnifiedLogin />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="editBlog/:id" element={<EditBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
