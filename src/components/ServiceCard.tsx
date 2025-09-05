
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

// Service type definition
export interface Service {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  address: string;
}


// ServiceCard component: displays a single service's info and booking button
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  // Get navigation function
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-101 hover:shadow-2xl flex flex-col">
      {/* Service image */}
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover lazyload"
        loading="lazy"
        style={{ transition: 'opacity 0.5s' }}
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Service name and description */}
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            {service.name}
          </h2>
          <p className="text-gray-600 mb-4 text-left line-clamp-3 relative">
            {service.description}
            <span className="absolute right-0 bottom-0 w-16 h-6 bg-gradient-to-l from-white via-white/80 to-transparent shadow-lg"></span>
          </p>
          {/* Duration and price */}
          <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <FaClock className="text-blue-500" />
              <span>{service.duration}</span>
              </div>        
              <div className="flex items-center gap-2 text-lg font-bold text-black-500 mb-2">
              €{service.price}
              </div>
          </div>
          {/* Address */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <FaMapMarkerAlt className="text-violet-500" />
            <span>{service.address}</span>
          </div>
        </div>
        {/* Book Now button navigates to ServiceDetails */}
        <button
          className="mt-2 w-full py-2 px-4 bg-black text-white rounded-lg font-semibold shadow hover:opacity-75 transition duration-200 cursor-pointer"
          onClick={() => navigate(`/service/${service.id}`, { state: { service } })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
