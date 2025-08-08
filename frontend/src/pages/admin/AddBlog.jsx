// import React, { useEffect, useRef, useState } from "react";
// import Quill from "quill";

// import { assets } from "../../assets/assets";

// const AddBlog = () => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const [image, setImage] = useState(false);
//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Startup");
//   const [isPublished, setIsPublished] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     // Initiate Quill Only Once
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, { theme: "snow" });
//     }
//   }, []);

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
//     >
//       <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
//         <p> Upload Thumbnail</p>
//         <label htmlFor="image">
//           <img
//             src={!image ? assets.upload_area : URL.createObjectURL(image)}
//             className="mt-2 h-16 rounded  cursor-pointer"
//           />
//           <input
//             onChange={(e) => setImage(e.target.files[0])}
//             type="file"
//             id="image"
//             hidden
//             required
//           />
//         </label>

//         <p className="mt-4">BLog title</p>
//         <input
//           type="text"
//           placeholder="Type Here"
//           required
//           className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
//           onChange={(e) => setTitle(e.target.value)}
//           value={title}
//         />

//         <p className="mt-4">Subtitle</p>
//         <input
//           type="text"
//           placeholder="Type Here"
//           required
//           className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
//           onChange={(e) => setSubTitle(e.target.value)}
//           value={subTitle}
//         />

//         <p className="mt-4">Blog Description</p>
//         <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
//           <div ref={editorRef}></div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AddBlog;

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { assets, blogCategories } from "../../assets/assets";

const AddBlog = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState(""); // Markdown text
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      subTitle,
      description, // markdown content
      category,
      isPublished,
      image,
    };

    console.log("Submitting Blog:", blogData);
    // You can now send blogData to your backend
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className="mt-2 h-16 rounded cursor-pointer"
            alt="thumbnail"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type Here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4">Subtitle</p>
        <input
          type="text"
          placeholder="Type Here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4">Blog Description (Markdown)</p>
        <div className="mt-2 max-w-lg">
          <MDEditor
            value={description}
            onChange={setDescription}
            height={300}
          />
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="mt-8  w-40 px-6 py-2 bg-primary text-white rounded hover:bg-blue-700"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
