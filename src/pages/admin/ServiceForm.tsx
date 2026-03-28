import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addService, updateService } from "../../pages/admin/api/serviceApi";
import { toast } from "sonner";

const ServiceForm = ({ existingData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(
    existingData?.imageUrl || ""
  );

  const [formData, setFormData] = useState(
    existingData || {
      type: "",
      title: "",
      slug: "",
      category: "",
      author: "",
      date: "",
      excerpt: "",
      image: null,
      content: "",
    }
  );

  // ==============================
  // Auto Slug Generate (Only Add Mode)
  // ==============================
  useEffect(() => {
    if (!existingData && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
      }));
    }
  }, [formData.title, existingData]);

  // ==============================
  // Handle Input Change
  // ==============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleExcerptChange = (value) => {
    setFormData({ ...formData, excerpt: value });
  };

  // ==============================
  // Image Upload
  // ==============================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // ==============================
  // Validation
  // ==============================
  const validate = () => {
    let newErrors = {};

    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.slug) newErrors.slug = "Slug is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.excerpt) newErrors.excerpt = "Excerpt is required";
    if (!formData.content) newErrors.content = "Content is required";

    if (!existingData && !formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==============================
  // Submit
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = new FormData();

    data.append("type", formData.type);
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("category", formData.category);
    data.append("author", formData.author || "");
    data.append("date", formData.date || "");
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      setLoading(true);

      if (existingData) {
        await updateService(existingData._id, data);
        toast.success("Service updated successfully");
      } else {
        await addService(data);
        toast.success("Service added successfully");
      }

      onSuccess();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const excerptModules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold">
        {existingData ? "Edit Service" : "Add Service"}
      </h3>

      {/* TYPE */}
      <select
  name="type"
  value={formData.type}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Type</option>
  <option value="blog">Blog</option>
  <option value="course">Course</option>
  <option value="article">Articles</option>
  <option value="case_study">Case Study</option> {/* ✅ FIXED */}
</select>
      {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

      {/* TITLE */}
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      {/* SLUG */}
      <input
        name="slug"
        placeholder="Slug"
        value={formData.slug}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
      {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}

      {/* CATEGORY */}
      <input
        name="category"
        placeholder="Category (e.g. Cyber Security)"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
      {errors.category && (
        <p className="text-red-500 text-sm">{errors.category}</p>
      )}

      {/* IMAGE */}
      <div>
        <label className="block mb-2 font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border p-2 rounded-lg"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 w-32 h-32 object-cover rounded-lg border"
          />
        )}

        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      {/* EXCERPT */}
      <div>
        <label className="block mb-2 font-medium">Excerpt</label>
        <ReactQuill
          value={formData.excerpt}
          onChange={handleExcerptChange}
          modules={excerptModules}
          className="bg-white"
        />
        {errors.excerpt && (
          <p className="text-red-500 text-sm">{errors.excerpt}</p>
        )}
      </div>

      {/* CONTENT */}
      <div>
        <label className="block mb-2 font-medium">Content</label>
        <ReactQuill
          value={formData.content}
          onChange={handleContentChange}
          className="bg-white"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        {loading
          ? "Saving..."
          : existingData
          ? "Update Service"
          : "Add Service"}
      </button>
    </form>
  );
};

export default ServiceForm;
