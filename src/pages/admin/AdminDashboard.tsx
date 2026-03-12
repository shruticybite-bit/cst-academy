import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const AdminDashboard = () => {

  const [chartData, setChartData] = useState([]);

  const [workshopCount, setWorkshopCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      // Workshop
      const workshopRes = await axios.get(
        "https://cst-acadmay-backend.onrender.com/api/workshop-register"
      );

      const workshops = workshopRes.data?.data || [];

      setWorkshopCount(workshops.length);

      // Month wise graph
      const monthMap = {};

      workshops.forEach((item) => {

        const date = new Date(item.createdAt);

        const month = date.toLocaleString("default", {
          month: "short"
        });

        if (!monthMap[month]) {
          monthMap[month] = 0;
        }

        monthMap[month]++;

      });

      const monthOrder = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const formattedData = monthOrder
        .filter(month => monthMap[month])
        .map(month => ({
          name: month,
          registrations: monthMap[month]
        }));

      setChartData(formattedData);


      // Contact
      const contactRes = await axios.get(
        "https://cst-acadmay-backend.onrender.com/api/contact"
      );

      setContactCount(contactRes.data?.data?.length || 0);


      // Services (Courses + Blogs)
      const serviceRes = await axios.get(
        "https://cst-acadmay-backend.onrender.com/api/services/list"
      );

      const services = serviceRes.data?.data || [];

      const courses = services.filter(
        (item) => item.type === "course"
      );

      const blogs = services.filter(
        (item) => item.type === "blog"
      );

      setCourseCount(courses.length);
      setBlogCount(blogs.length);

    } catch (error) {
      console.error("Dashboard API error:", error);
    }

  };

  return (
    <div className="space-y-10">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Workshop Registrations</p>
          <h2 className="text-3xl font-bold text-orange-500 mt-2">
           <a href="/admin/workshop">{workshopCount}</a> 
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Contact Submissions</p>
          <h2 className="text-3xl font-bold text-blue-500 mt-2">
          <a href="/admin/contacts">{contactCount}</a>  
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total Courses</p>
          <h2 className="text-3xl font-bold text-green-500 mt-2">
           <a href="/admin/services">{courseCount}</a> 
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total Blogs</p>
          <h2 className="text-3xl font-bold text-purple-500 mt-2">
           <a href="/admin/services">{blogCount}</a> 
          </h2>
        </div>

      </div>


      {/* Graph */}
      <div className="bg-white rounded-xl shadow p-6">

        <h3 className="text-lg font-semibold mb-4">
          Workshop Registrations Growth
        </h3>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="registrations"
              stroke="#f97316"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AdminDashboard;