import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const WorkshopPopup = ({ isOpen, onClose }) => {
  const [cmsData, setCmsData] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
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
        if (res?.data?.success && res?.data?.data) {
          setCmsData(res.data.data);
        }
      } catch (err) {
        console.log("CMS Error:", err);
      }
    };
    fetchCMS();
  }, []);

  /* ================= SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!isOpen || !cmsData?.enabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      let target;

      if (cmsData?.date) {
        target = new Date(
          `${cmsData.date}T${cmsData.hours}:${cmsData.minutes}:${cmsData.seconds}`
        );
      } else {
        target = new Date();
        target.setHours(Number(cmsData?.hours || 0));
        target.setMinutes(Number(cmsData?.minutes || 0));
        target.setSeconds(Number(cmsData?.seconds || 0));
      }

      const diff = Math.max(0, Math.floor((target - now) / 1000));
      setRemainingSeconds(diff);

      if (diff === 0) {
        clearInterval(interval);
        setRemainingSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, cmsData]);

  if (!isOpen || !cmsData?.enabled) return null;

  /* ================= TIME ================= */
  const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  /* ================= VALIDATION ================= */
  const validate = () => {
    let err = {};

    if (!formData.firstName.trim()) err.firstName = "First name required";
    if (!formData.lastName.trim()) err.lastName = "Last name required";

    if (!formData.email.trim()) {
      err.email = "Email required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = "Invalid email";
    }

    if (!formData.phone) {
      err.phone = "Phone required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      err.phone = "Phone must be 10 digits";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

      if (res?.data?.success) {
        toast.success("Registration Successful 🎉");
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        });
      } else {
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Registration failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md">
      <div className="min-h-screen flex justify-center items-center px-3">
        <div className="relative w-full max-w-5xl bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-3xl shadow-2xl border border-blue-500/20 grid lg:grid-cols-2 overflow-hidden">

          {/* HEADER (FIXED CLOSE BUTTON) */}
          <div className="absolute top-0 left-0 w-full flex justify-end p-4 z-50">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          {/* LEFT */}
          <div className="p-6 pt-10">
            <h2 className="text-2xl text-white font-bold">
              {cmsData?.title}
            </h2>

            {/* IMAGE */}
            {cmsData?.image && (
              <div className="mt-6 flex justify-center">
                <img
                  src={cmsData.image}
                  alt="Workshop"
                  className="max-h-44 object-cover rounded-xl shadow-lg"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            {/* TIMER */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-xl text-xl font-bold text-white tracking-widest shadow-lg">
                {hours} : {minutes} : {seconds}
              </div>
            </div>

            {/* DESC */}
            <p className="text-gray-400 mt-6 text-sm leading-relaxed">
              {cmsData?.description}
            </p>
          </div>

          {/* RIGHT */}
          <div className="p-6 pt-12 bg-[#020617]">
            {!isSubmitted ? (
              <>
                <input name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} className="w-full mb-2 p-3 rounded-xl bg-[#1f2937] border border-gray-700 text-white focus:border-blue-500 outline-none" />
                {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}

                <input name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} className="w-full mb-2 p-3 rounded-xl bg-[#1f2937] border border-gray-700 text-white" />
                {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}

                <input name="phone" placeholder="Phone *" maxLength={10} value={formData.phone} onChange={handleChange} className="w-full mb-2 p-3 rounded-xl bg-[#1f2937] border border-gray-700 text-white" />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}

                <input name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="w-full mb-2 p-3 rounded-xl bg-[#1f2937] border border-gray-700 text-white" />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}

                <button onClick={handleSubmit} disabled={loading} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-xl text-white font-semibold shadow-lg">
                  {loading ? "Submitting..." : "SUBMIT"}
                </button>
              </>
            ) : (
              <div className="text-center text-white">
                <div className="text-4xl mb-3">✅</div>
                <h2 className="text-2xl font-bold">Thank You!</h2>
                <button onClick={onClose} className="mt-4 px-6 py-2 bg-blue-600 rounded">
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