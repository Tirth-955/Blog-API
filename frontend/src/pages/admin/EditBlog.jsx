import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";

const EditBlog = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [blog, setBlog] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    isPublished: false,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/blog/${id}`);
        if (data.success) {
          setBlog(data.blog);
          setPreview(data.blog.image);
        } else {
          toast.error(data.message);
          navigate("/admin/listBlog");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch blog data"
        );
        navigate("/admin/listBlog");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id, axios, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setBlog((prev) => ({ ...prev, description: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("description", blog.description || "");
    formData.append("blog", JSON.stringify(blog));
    if (image) {
      formData.append("image", image);
    }

    try {
      const { data } = await axios.put(`/api/blog/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("Blog updated successfully!");
        navigate("/admin/listBlog");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !blog.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Blog Post</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={blog.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="subTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Sub Title
          </label>
          <input
            type="text"
            name="subTitle"
            id="subTitle"
            value={blog.subTitle}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={blog.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-2" data-color-mode="light">
            <MDEditor
              value={blog.description}
              onChange={handleDescriptionChange}
              height={400}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
          {preview && (
            <img
              src={preview}
              alt="Blog preview"
              className="mt-4 h-48 w-auto rounded-lg"
            />
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            checked={blog.isPublished}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="isPublished"
            className="ml-2 block text-sm text-gray-900"
          >
            Publish
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
