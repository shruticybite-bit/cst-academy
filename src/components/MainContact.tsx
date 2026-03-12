import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import MapSection from "./MapSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ContactSection = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // phone me sirf numbers
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  // validation
  const validateForm = () => {

    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } 
    else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid Gmail (example@gmail.com)";
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } 
    else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);

    const isValid = validateForm();

    if (!isValid) return;

    try {

      setLoading(true);

      const res = await axios.post(
        "https://cst-acadmay-backend.onrender.com/api/contact",
        formData
      );

      if (res.data.success) {

        setSuccess(true);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        setErrors({});
      }

    } catch (err) {

      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground w-full max-w-[100vw] relative">

        <Navbar />
        <SEO
        title="CST Academy - Contact Information"
        type="website"
      />
        <main>

          <section className="py-20 px-4">

            <div className="max-w-6xl mx-auto">

              <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

                <div className="grid md:grid-cols-2">

                  {/* LEFT */}
                  <div className="p-12 bg-[#0b1224] text-white">

                    <h2 className="text-3xl font-bold mb-4">
                      Contact Information
                    </h2>

                    <div className="space-y-6 text-white/80">

                      <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-wrlds-blue"/>
                        +91 92037 33491
                      </div>

                      <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-wrlds-blue"/>
                        academy.codesec@gmail.com
                      </div>

                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-1 text-wrlds-blue"/>
                        <span>
                          207, 5th floor, Sunrise tower, Above Samarpan Jwellers
                          <br/>
                          MG Road, Indore, MP, 452003
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="p-12 bg-gradient-to-br from-[#0f1a35] to-[#111c3d] text-white">

                    <form onSubmit={handleSubmit} className="space-y-8">

                      {/* name */}
                      <div className="grid sm:grid-cols-2 gap-6">

                        <div>
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                          />

                          {errors.firstName && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                        />

                      </div>


                      {/* email phone */}
                      <div className="grid sm:grid-cols-2 gap-6">

                        <div>

                          <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                          />

                          {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}

                        </div>


                        <div>

                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            maxLength="10"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                          />

                          {errors.phone && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.phone}
                            </p>
                          )}

                        </div>

                      </div>


                      {/* message */}
                      <div>

                        <textarea
                          rows="3"
                          name="message"
                          placeholder="Write your message.."
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2 resize-none"
                        />

                        {errors.message && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.message}
                          </p>
                        )}

                      </div>


                      {success && (
                        <p className="text-green-400 text-sm">
                          Message sent successfully!
                        </p>
                      )}

                      <div className="flex justify-end">

                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-wrlds-blue hover:opacity-90 rounded-lg font-semibold transition disabled:opacity-60"
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </button>

                      </div>

                    </form>

                  </div>

                </div>

              </div>

            </div>

          </section>

          <MapSection/>

        </main>

        <Footer/>

      </div>
    </>
  );
};

export default ContactSection;