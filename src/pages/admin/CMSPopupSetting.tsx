import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Upload, Clock, Loader2 } from "lucide-react";

const CMSPopupSetting = () => {
  const [loading, setLoading] = useState(false);

  

  const [cmsData, setCmsData] = useState({
  title: "",
  description: "",
  image: null,
  preview: "",
  hours: "00",
  minutes: "00",
  seconds: "00",
  enabled: true,
  removeImage: false,
});

  /* ==============================
     FETCH EXISTING CMS
  ============================== */
  const fetchCMS = async () => {
    try {
      const res = await axios.get(
        "https://cst-acadmay-backend.onrender.com/api/cms-popup"
      );

      if (res.data.success && res.data.data) {
        const data = res.data.data;

        setCmsData({
          title: data.title || "",
          description: data.description || "",
          image: null,
          preview: data.image || "",
          hours: data.hours || "00",
          minutes: data.minutes || "00",
          seconds: data.seconds || "00",
          enabled: data.enabled ?? true,
        });
      }
    } catch (error) {
      toast.error("Failed to load CMS data");
    }
  };

  useEffect(() => {
    fetchCMS();
  }, []);

  /* ==============================
     HANDLE INPUT CHANGE
  ============================== */
  const handleCmsChange = (e) => {
    const { name, value } = e.target;
    setCmsData({ ...cmsData, [name]: value });
  };

  const handleCmsImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    setCmsData({
      ...cmsData,
      image: file,
      preview: URL.createObjectURL(file),
      removeImage: false, // ✅ IMPORTANT
    });
  }
};

  /* ==============================
     SUBMIT CMS
  ============================== */
  const handleCmsSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", cmsData.title);
      formData.append("description", cmsData.description);
      formData.append("hours", cmsData.hours);
      formData.append("minutes", cmsData.minutes);
      formData.append("seconds", cmsData.seconds);
      formData.append("enabled", cmsData.enabled);
      
      formData.append("removeImage", cmsData.removeImage);

        // ✅ ONLY send image if file exists
        if (cmsData.image instanceof File) {
          formData.append("image", cmsData.image);
        }
        

      const res = await axios.post(
        "https://cst-acadmay-backend.onrender.com/api/cms-popup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("CMS Updated Successfully");
        fetchCMS();
      }

    } catch (error) {
      toast.error("Failed to save CMS");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setCmsData({
      ...cmsData,
      image: null,
      preview: "",
      removeImage: true, // ✅ MUST
    });
  };
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6 text-[#0B1C3D]">
        CMS Settings
      </h2>

      <form onSubmit={handleCmsSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={cmsData.title}
            onChange={handleCmsChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F97316]"
            placeholder="Enter Title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={cmsData.description}
            onChange={handleCmsChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F97316]"
            placeholder="Enter Description"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload Image</label>

         {cmsData.preview && (
        <div className="relative w-32 mb-3">
          <img
            src={cmsData.preview}
            alt="Preview"
            className="w-32 rounded-lg border"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      )}
          <label className="flex items-center gap-3 cursor-pointer bg-gray-100 p-3 rounded-lg border border-dashed hover:border-[#F97316]">
            <Upload size={18} />
            <span className="text-sm truncate">
              {cmsData.image ? cmsData.image.name : "Choose Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCmsImage}
              className="hidden"
            />
          </label>
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Time (HH : MM : SS)
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <Clock size={18} />

            <input
              type="number"
              name="hours"
              min="0"
              max="23"
              value={cmsData.hours}
              onChange={handleCmsChange}
              className="w-20 px-3 py-2 border rounded-lg text-center"
            />
            :
            <input
              type="number"
              name="minutes"
              min="0"
              max="59"
              value={cmsData.minutes}
              onChange={handleCmsChange}
              className="w-20 px-3 py-2 border rounded-lg text-center"
            />
            :
            <input
              type="number"
              name="seconds"
              min="0"
              max="59"
              value={cmsData.seconds}
              onChange={handleCmsChange}
              className="w-20 px-3 py-2 border rounded-lg text-center"
            />
          </div>
        </div>

        {/* Enable Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Enable Section</span>

          <div
            onClick={() =>
              setCmsData({ ...cmsData, enabled: !cmsData.enabled })
            }
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
              cmsData.enabled ? "bg-[#F97316]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                cmsData.enabled ? "translate-x-6" : ""
              }`}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F97316] hover:bg-orange-600 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          Save CMS Settings
        </button>

      </form>
    </div>
  );
};

export default CMSPopupSetting;