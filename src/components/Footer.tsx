import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-accent via-[#CEA5D6] to-primary/20 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">Monteverde Chicago</h2>
            <p className="text-white/80 text-sm">
              Experience the best of Italian-American cuisine in the heart of Chicago.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-2 text-primary font-medium">
              <MapPin className="h-5 w-5" />
              <span>1020 W Madison St, Chicago, IL 60607</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Contact Us</h3>
            <div className="flex justify-center md:justify-start items-center gap-2 text-primary">
              <Phone className="h-5 w-5" />
              <span>(312) 888-3041</span>
            </div>
            <div className="flex justify-center md:justify-start items-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              <span>info@monteverdechicago.com</span>
            </div>
            <p className="text-primary font-medium text-sm">
              Open Hours: Tue-Sun: 5 PM - 10 PM
            </p>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-primary/20 text-center text-sm text-white/80">
          © {new Date().getFullYear()} Monteverde Chicago. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
