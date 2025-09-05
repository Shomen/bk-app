import { useState } from "react";
import SuccessModal from "../components/SuccessModal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";


// Helper to get next 14 dates for booking
const getNextDates = (count = 14) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      full: d.toISOString().split("T")[0],
    });
  }
  return dates;
};


// Available booking times
const availableTimes = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
];


// Filter available times based on selected date
function getFilteredTimes(selectedDate: string | null) {
  if (!selectedDate) return availableTimes;
  const todayISO = new Date().toISOString().split("T")[0];
  if (selectedDate !== todayISO) return availableTimes;
  // Only show times after now for today
  const now = new Date();
  return availableTimes.filter((t) => {
    const [time, meridian] = t.split(" ");
    let [hour, minute] = time.split(":").map(Number);
    if (meridian === "PM" && hour !== 12) hour += 12;
    const slot = new Date(now);
    slot.setHours(hour, minute, 0, 0);
    return slot > now;
  });
}


// ServiceDetails page: handles booking flow for a single service
const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get service details from router state
  const service = location.state?.service;
  // State for selected date, time, and booking confirmation
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const dates = getNextDates();


  // If no service found, show error and back button
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-50 bg-[url('/images/service-pexels-heyho-7750100.jpg')] bg-cover bg-center py-10 px-2 md:px-8 lg:px-16">
      {/* Overlay and blur effect */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md pointer-events-none z-0"></div>
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Back button */}
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 self-start"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={20} />
          <span className="font-medium cursor-pointer">Back to Services</span>
        </button>
        {/* Service details card */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={service.image}
            alt={service.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
              {service.name}
            </h1>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {service.description}
            </p>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-base text-gray-500">
                  <FaClock className="text-blue-500" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xl font-bold text-black-500">
                  <FaMoneyBillWave />${service.price}
                </div>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-500 mt-4">
                <FaMapMarkerAlt className="text-violet-500" />
                <span>{service.address}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Date selection */}
        <div className="w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-2">Select a Date</h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {dates.map((d) => (
              <button
                key={d.full}
                className={`flex flex-col items-center px-4 py-2 rounded-lg border transition shadow-sm cursor-pointer bg-white hover:bg-blue-50 ${
                  selectedDate === d.full
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-200"
                }`}
                onClick={() => {
                  setSelectedDate(d.full);
                  setSelectedTime(null);
                  setConfirmed(false);
                }}
              >
                <span className="text-xs font-semibold text-gray-500">
                  {d.day}
                </span>
                <span className="text-lg font-bold">{d.date}</span>
                <span className="text-xs text-gray-500">{d.month}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Time selection */}
        {selectedDate && (
          <div className="w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-2">Select a Time</h2>
            <div className="flex gap-2 flex-wrap justify-center">
              {getFilteredTimes(selectedDate).length === 0 ? (
                <div className="text-gray-500 text-center w-full">
                  No times available for today.
                </div>
              ) : (
                getFilteredTimes(selectedDate).map((t) => (
                  <button
                    key={t}
                    className={`cursor-pointer px-4 py-2 rounded-lg border transition shadow-sm bg-white hover:bg-blue-50 ${
                      selectedTime === t
                        ? "border-blue-600 shadow-lg"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedTime(t);
                      setConfirmed(false);
                    }}
                  >
                    {t}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
        {/* Confirmation button */}
        {selectedDate && selectedTime && !confirmed && (
          <div className="max-w-xl w-full mb-6 flex justify-center">
            <button
              className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-200"
              onClick={() => setConfirmed(true)}
            >
              Confirm Booking
            </button>
          </div>
        )}
        {/* Success modal: shows after booking, redirects to home on close */}
        <SuccessModal
          open={confirmed}
          onClose={() => {
            setConfirmed(false);
            navigate('/');
          }}
          title="Booking Confirmed!"
          message={`Your booking for ${service.name} on ${selectedDate} at ${selectedTime} is confirmed.`}
        />
      </div>
    </div>
  );
};

export default ServiceDetails;
