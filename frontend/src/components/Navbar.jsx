import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  // const navigate = useNavigate();
  const { navigate, token } = useAppContext();

  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer ">
      <h1
        onClick={() => navigate("/")}
        className="text-4xl font-bold text-primary"
      >
        MultiBlog
      </h1>

      <button
        onClick={() => navigate("/admin")}
        className="flex items-center rounded-full cursor-pointer bg-primary text-white px-10 py-2.5"
      >
        {token ? "Dashboard" : "Login"}
      </button>
    </div>
    </div>
  );
};

export default Navbar;
