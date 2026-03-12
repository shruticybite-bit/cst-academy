import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import MapSection from "./MapSection";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.firstName || !formData.email || !formData.message) {
      setError("Please fill all required fields");
      return;
    }

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
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <div className="min-h-screen bg-background text-foreground w-full max-w-[100vw] relative selection:bg-infrared-red selection:text-white">
      <Navbar />
       <main>
       <section id="contact" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">

            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

              <div className="grid md:grid-cols-2">

                {/* LEFT SIDE */}
                <div className="p-12 bg-[#0b1224] text-white">
                  <h2 className="text-3xl font-bold mb-4">
                    Contact Information
                  </h2>
                  <p className="text-white/60 mb-10">
                    Say something to start a live chat!
                  </p>

                  <div className="space-y-6 text-white/80">
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-wrlds-blue" />
                      +91-8210543772
                    </div>

                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-wrlds-blue" />
                      info@cybite.in
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 mt-1 text-wrlds-blue" />
                      <span>
                        G-9/85, Sangam Vihar <br />
                        New Delhi-110080
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-12 bg-gradient-to-br from-[#0f1a35] to-[#111c3d] text-white">

                  <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Name */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                      />

                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                      />

                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2"
                      />
                    </div>

                    {/* Subject */}
                    {/* <div>
                      <p className="mb-3 text-white/60">Select Subject?</p>
                      <div className="flex flex-wrap gap-6 text-sm">
                        {["UI/UX Design", "Development", "Cyber Security", "Training", "Digital Marketing"].map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="subject"
                              value={item}
                              onChange={handleChange}
                              className="accent-wrlds-blue"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div> */}

                    {/* Message */}
                    <textarea
                      rows="3"
                      name="message"
                      placeholder="Write your message.."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/30 focus:border-wrlds-blue outline-none pb-2 resize-none"
                    ></textarea>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && (
                      <p className="text-green-400 text-sm">
                        Message sent successfully!
                      </p>
                    )}

                    {/* Button */}
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
         <MapSection />
       </main>
   
      <div className="relative z-50">
        <Footer />
      </div>
     
     </div>
    </>
    
  );
};

export default ContactSection;