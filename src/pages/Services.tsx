import servicesData from '../assets/data.json';
import ServiceCard from '../components/ServiceCard';


// Services page component: lists all available services
const Services = ()=> {
  return (
    <div className="min-h-screen relative bg-gray-50 bg-[url('/images/bg-pexels-asphotograpy-518244.jpg')] bg-cover bg-center p-6">
      {/* Overlay and blur effect */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm pointer-events-none z-0"></div>
      <div className="relative z-10">
        {/* Page title */}
        <h1 className="text-4xl font-bold mb-6 text-center">Our Services</h1>
        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map(service => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Services;