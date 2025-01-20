import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://lh3.googleusercontent.com/p/AF1QipN9cAejnjhIc7_F9sgDmWEWqkqONbBMlHPIJIgM=s1360-w1360-h1020",
  "https://theworldkeys.com/wp-content/uploads/2022/08/Monteverde-restaurant-Chicago_theworldkeys_11.webp",
  "https://res.cloudinary.com/the-infatuation/image/upload/c_scale,w_1200,q_auto,f_auto/cms/reviews/monteverde/banners/1581520305.88",
  "https://media.timeout.com/images/103020395/750/422/image.jpg"
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-accent via-[#CEA5D6] to-primary/20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-20 my-10 ">
      <div className=" pt-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

          {/* Content section */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary mb-4 md:mb-6 leading-tight">
              Experience
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Fine Dining
              </span>
              at Its Best
            </h1>
            <motion.p 
              className="text-gray-600 text-lg md:text-xl mb-6 md:mb-8 max-w-lg mx-auto md:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Indulge in exquisite flavors and impeccable service at Gourmet
              Haven. Your culinary journey begins here.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
                asChild
              >
                <a href="#reservations">Book a Table</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
                asChild
              >
                <a href="#menu">View Menu</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Centered Image carousel */}
          <motion.div 
            className="w-full md:w-1/2 relative h-[300px] sm:h-[400px] flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt={`Restaurant Image ${currentImage + 1}`}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
