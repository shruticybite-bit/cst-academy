import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Search, Trash2 } from "lucide-react";

const AdminContactPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  // Fetch Contacts
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete Contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`);
      toast.success("Contact deleted successfully");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  // Search Filter
  const filteredData = data.filter(
    (item) =>
      item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F4F7FB] text-gray-600">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t hover:bg-[#F9FAFB] transition"
                    >
                      <td className="p-4 font-medium">
                        {item.firstName}
                      </td>
                      <td className="p-4">{item.email}</td>
                      <td className="p-4">{item.phone || "-"}</td>
                      <td className="p-4">{item.service || "-"}</td>
                      <td className="p-4 max-w-xs truncate">
                        {item.message}
                      </td>
                      <td className="p-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-6 text-gray-500">
                      No contacts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {currentRecords.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-2"
          >
            <div className="font-semibold text-[#0B1C3D]">
              {item.firstName}
            </div>
            <div className="text-sm text-gray-600">
              {item.email}
            </div>
            <div className="text-sm text-gray-600">
              {item.phone || "-"}
            </div>
            <div className="text-sm text-gray-600">
              {item.service || "-"}
            </div>
            <div className="text-sm text-gray-600">
              {item.message}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(item.date).toLocaleDateString()}
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="flex items-center gap-2 text-red-500 text-sm"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                currentPage === index + 1
                  ? "bg-[#F97316] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContactPage;
