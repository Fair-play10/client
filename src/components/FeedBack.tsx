import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const SAMPLE_FEEDBACK = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Absolutely amazing experience! The attention to detail and customer service exceeded all my expectations. I couldn't be happier with the results and would highly recommend to anyone looking for top-quality service.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    text: "Very professional and efficient service. While there's always room for minor improvements, the overall experience was great and I would definitely use again.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    text: "Outstanding service from start to finish! The team was incredibly responsive and made sure every detail was perfect. This is exactly what premium service should look like.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 5,
    text: "Exceptional quality and service! The team went above and beyond to ensure everything was perfect. Highly recommended!",
    avatar: "/api/placeholder/40/40"
  }
];

const FeedbackCard = ({ feedback }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = feedback.text.length > 100;
  
  return (
    <div className=" w-full  transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl bg-white bg-opacity-90 p-6 shadow-lg ">
      <div className="flex items-start space-x-4">
        <div className="animate-bounce-slow">
          <img
            src={feedback.avatar}
            alt={feedback.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 ">
          <h3 className="font-semibold text-lg">{feedback.name}</h3>
          <div className="flex space-x-1 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < feedback.rating
                    ? 'text-yellow-400 animate-shimmer'
                    : 'text-gray-300'
                }`}
                fill={i < feedback.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className="text-gray-600">
            {shouldTruncate && !isExpanded
              ? `${feedback.text.slice(0, 100)}...`
              : feedback.text}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-700 mt-2 flex items-center"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={16} className="ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
  
    const itemsPerPage = 1;
    const totalItems = children.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientX);
    };
  
    const handleTouchMove = (e) => {
      setTouchEnd(e.touches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 75) {
        handleNext();
      }
      if (touchStart - touchEnd < -75) {
        handlePrev();
      }
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalPages - 1 ? 0 : prevIndex + 1
      );
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
    };
  
    return (
      <div className="relative w-full">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex / totalPages) * 100}%)`, // Corrected calculation
              width: `${totalPages * 100}%`,
            }}
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <div
                key={pageIndex}
                className="flex flex-col md:flex-row gap-6 w-full"
                style={{ padding: '0 1rem' }}
              >
                {children.slice(
                  pageIndex * itemsPerPage,
                  (pageIndex + 1) * itemsPerPage
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className=" absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
  
        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === currentIndex ? 'bg-white w-4' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };
  

const FeedbackComponent = () => {
  return (
    <div className="min-h-120 p-8 bg-gradient-to-br from-white via-[#CEA5D6] to-purple-500 animate-gradient-xy">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          What Our Customers Say
        </h2>
        <Carousel>
          {SAMPLE_FEEDBACK.map((feedback) => (
            <div
              key={feedback.id}
              className="opacity-0 animate-fade-in-up w-full"
              style={{
                animationDelay: `${feedback.id * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <FeedbackCard feedback={feedback} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

// Add required styles via Tailwind
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient-xy {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes shimmer {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-gradient-xy {
    background-size: 400% 400%;
    animation: gradient-xy 15s ease infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 1s ease-in-out;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
  }
`;
document.head.appendChild(style);

export default FeedbackComponent;