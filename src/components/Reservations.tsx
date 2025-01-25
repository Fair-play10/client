import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Phone, MessageSquare, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import axiosInstance from "../hooks/axios";

export const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    numberOfPersons: "",
    seating: "indoor",
    date: "",
    time: "",
    phone: "",
    comments: "",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/reservations",formData);
      console.log("Reservation successful:", response);
      setAlert({
        type: "success",
        message: "Your reservation was successfully submitted!",
      });
      setFormData({
        name: "",
        numberOfPersons: "",
        seating: "indoor",
        date: "",
        time: "",
        phone: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting reservation:", error);
      setAlert({
        type: "error",
        message: "Failed to submit reservation. Please try again.",
      });
    }
  };

  return (
    <section id="reservations" className="relative min-h-screen overflow-hidden">
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

      <div className="relative container mx-auto px-4 py-16 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
            Make a Reservation
          </h2>

          {/* Display Alert */}
          {alert && (
            <Alert
              variant={alert.type === "success" ? "default" : "destructive"}
              className="mb-6 bg-white"
            >
              <AlertTitle>
                {alert.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-primary font-medium">
                  <Users className="h-5 w-5" />
                  Full Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-white/20 border-primary/20"
                />
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-primary font-medium">
                  <Users className="h-5 w-5" />
                  Number of Guests
                </label>
                <Input
                  type="number"
                  name="numberOfPersons"
                  value={formData.numberOfPersons}
                  onChange={handleChange}
                  placeholder="Number of guests"
                  className="bg-white/20 border-primary/20"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-primary font-medium">
                  <Calendar className="h-5 w-5" />
                  Date
                </label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-white/20 border-primary/20"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-primary font-medium">
                  <Clock className="h-5 w-5" />
                  Time
                </label>
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="bg-white/20 border-primary/20"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-primary font-medium">
                  <Phone className="h-5 w-5" />
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="bg-white/20 border-primary/20"
                />
              </div>

              {/* Seating Preference */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-primary font-medium">
                  <Home className="h-5 w-5" />
                  Seating Preference
                </label>
                <div className="flex gap-4 p-2 bg-white/20 rounded-md">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="seating"
                      value="indoor"
                      checked={formData.seating === "indoor"}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span className="text-primary">Indoor</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="seating"
                      value="outdoor"
                      checked={formData.seating === "outdoor"}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span className="text-primary">Outdoor</span>
                  </label>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-primary font-medium">
                  <MessageSquare className="h-5 w-5" />
                  Special Requests
                </label>
                <Textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Any special requests or occasions?"
                  className="bg-white/20 border-primary/20 min-h-[100px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 w-full md:w-auto min-w-[200px]"
              >
                Reserve Now
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Reservation;
