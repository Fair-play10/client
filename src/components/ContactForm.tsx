import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axiosInstance from "../hooks/axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  content: z.string().min(10, "Message must be at least 10 characters"),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      content: "",
    },
  });
const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);
    toast.success("Message sent successfully!");
    try {
      const response = await axiosInstance.post("/contact", values);
      console.log("cantact successful:", response);
      setAlert({
        type: "success",
        message: "Your cantact was successfully submitted!",
      });
    } catch (error) {
      console.error("Error submitting cantact:", error);
      setAlert({
        type: "error",
        message: "Failed to submit cantact. Please try again.",
      });
    }
    setTimeout(() => form.reset(), 5000)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent to-[#CEA5D6]"
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
            Contact Us
          </h2>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        {...field}
                        className="bg-white/20 border-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What's this about?"
                        {...field}
                        className="bg-white/20 border-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you're thinking about..."
                        className="bg-white/20 border-primary/20 min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 w-full md:w-auto min-w-[200px]"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};
