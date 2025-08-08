import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
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
          Logout
        </button>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
