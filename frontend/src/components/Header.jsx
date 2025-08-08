import React from "react";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative text-center">
      <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-[4.5rem] text-gray-700">
        The Blogging Platform
      </h1>

      <form className="mt-6 mx-auto border border-gray-300 bg-white rounded overflow-hidden flex justify-between max-w-lg max-sm:scale-90">
        <input
          className="w-full pl-4 py-2 outline-none"
          type="text"
          placeholder="Search for blogs"
          required
        />

        <button
          className="bg-primary text-white px-6 py-2 m-1 rounded hover:scale-105 transition-all cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
