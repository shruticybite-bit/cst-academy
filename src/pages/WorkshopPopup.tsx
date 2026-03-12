import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const WorkshopPopup = ({ isOpen, onClose }) => {
  const [cmsData, setCmsData] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= FETCH CMS ================= */
  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const res = await axios.get(
          "https://cst-acadmay-backend.onrender.com/api/cms-popup"
        );

        if (res.data.success && res.data.data) {
          const data = res.data.data;

          const totalSeconds =
            Number(data.hours) * 3600 +
            Number(data.minutes) * 60 +
            Number(data.seconds);

          setElapsedSeconds(totalSeconds);
          setCmsData(data);
        }
      } catch (error) {
        console.log("CMS Fetch Error:", error);
      }
    };

    fetchCMS();
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!isOpen || !cmsData?.enabled) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, cmsData]);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    const shouldLockScroll = isOpen && cmsData?.enabled;

    if (shouldLockScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, cmsData]);

  if (!isOpen || !cmsData?.enabled) return null;

  const hours = String(Math.floor(elapsedSeconds / 3600)).padStart(2, "0");
  const minutes = String(
    Math.floor((elapsedSeconds % 3600) / 60)
  ).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");

  /* ================= VALIDATION ================= */
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= HANDLE FORM ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "https://cst-acadmay-backend.onrender.com/api/workshop-register",
        formData
      );

      if (res.data.success) {
        toast.success("Registration Successful 🎉");

        setIsSubmitted(true);

        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Registration Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="min-h-screen w-full flex justify-center px-3 py-6">
        <div className="relative w-full max-w-5xl bg-gradient-to-br from-[#0f172a] to-[#111827] rounded-2xl sm:rounded-3xl shadow-2xl border border-blue-500/20 grid grid-cols-1 lg:grid-cols-2 overflow-hidden my-auto">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl z-20"
          >
            ✕
          </button>

          {/* LEFT */}
          <div className="p-5 sm:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {cmsData.title}
            </h2>

            {cmsData.image && (
              <div className="mt-6 bg-[#020617] border border-blue-500/20 rounded-xl p-6 flex justify-center">
                <img
                  src={cmsData.image}
                  alt="Workshop"
                  className="max-h-40 object-contain"
                />
              </div>
            )}

            <div className="mt-6">
              <div className="bg-blue-600/20 border border-blue-500 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-lg sm:text-2xl font-bold text-blue-400 tracking-widest text-center sm:text-left">
                {hours} : {minutes} : {seconds}
              </div>
            </div>

            <p className="mt-6 text-gray-400 whitespace-pre-line">
              {cmsData.description}
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-[#0b1220] p-5 sm:p-8 flex items-center justify-center">

            {!isSubmitted ? (

              <div className="w-full">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">
                  Register Now
                </h3>

                <div className="space-y-4">

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm">{errors.firstName}</p>
                  )}

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm">{errors.phone}</p>
                  )}

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                  >
                    {loading ? "Submitting..." : "SUBMIT"}
                  </button>
                </div>
              </div>

            ) : (

              /* SUCCESS SCREEN */

              <div className="text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-4xl">
                  ✅
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Thank You!
                </h2>

                <p className="text-gray-400 max-w-sm mx-auto">
                  Your registration has been successfully submitted.
                  Our team will contact you soon with workshop details.
                </p>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition"
                >
                  Close
                </button>
              </div>

            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkshopPopup;