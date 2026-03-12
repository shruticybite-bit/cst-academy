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

  /* ================= SCROLL LOCK ================= */

  useEffect(() => {

    const shouldLockScroll = isOpen && cmsData?.enabled;

    document.body.style.overflow = shouldLockScroll ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [isOpen, cmsData]);

  if (!isOpen || !cmsData?.enabled) return null;

  const hours = String(Math.floor(elapsedSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");

  /* ================= VALIDATION ================= */

  const validate = () => {

    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Only Gmail allowed (example@gmail.com)";
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "phone") {

      if (!/^\d*$/.test(value)) return;

    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

  };

  /* ================= SUBMIT ================= */

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

      console.log(error);

      toast.error("Registration Failed ❌");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md overflow-y-auto">

      <div className="min-h-screen w-full flex justify-center px-3 py-6">

        <div className="relative w-full max-w-5xl bg-gradient-to-br from-[#0f172a] to-[#111827] rounded-3xl shadow-2xl border border-blue-500/20 grid grid-cols-1 lg:grid-cols-2 overflow-hidden my-auto">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl z-20"
          >
            ✕
          </button>

          {/* LEFT */}

          <div className="p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
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

              <div className="bg-blue-600/20 border border-blue-500 px-6 py-3 rounded-xl text-xl font-bold text-blue-400 tracking-widest text-center">

                {hours} : {minutes} : {seconds}

              </div>

            </div>

            <p className="mt-6 text-gray-400 whitespace-pre-line">
              {cmsData.description}
            </p>

          </div>

          {/* RIGHT */}

          <div className="bg-[#0b1220] p-6 sm:p-8 flex items-center justify-center">

            {!isSubmitted ? (

              <div className="w-full">

                <h3 className="text-xl font-semibold text-white mb-6">
                  Register Now
                </h3>

                <div className="space-y-4">

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white"
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
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white"
                  />

                  <input
                    type="tel"
                    name="phone"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white"
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
                    className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-white"
                  />

                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    {loading ? "Submitting..." : "SUBMIT"}
                  </button>

                </div>

              </div>

            ) : (

              <div className="text-center space-y-6">

                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-4xl">
                  ✅
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Thank You!
                </h2>

                <p className="text-gray-400 max-w-sm mx-auto">
                  Your registration has been successfully submitted.
                  Our team will contact you soon with CST Academy details.
                </p>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
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