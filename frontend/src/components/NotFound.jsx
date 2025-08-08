import React from "react";
import Navbar from "./Navbar";
import Moment from "moment";

import { assets } from "../assets/assets";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
      />

      <div className="text-center mt-20 text-gray-600">
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          Blog Not Found
        </h1>

        <h2 className="my-5 max-w mx-auto">The requested blog was not found. It may have been removed or not created yet.</h2>
      </div>
    </>
  );
};

export default NotFound;
