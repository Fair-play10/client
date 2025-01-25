import { useEffect, useState } from "react";
import axiosInstance from "../hooks/axios";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCart } from "@/components/CartContext";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ message = "Loading menu items..." }) => (
  <section className="py-16 px-4 md:px-8 bg-background" id="menu">
    <div className="container mx-auto max-w-7xl">
      <h2 className="text-4xl md:text-5xl font-display text-primary mb-8 text-center">
        Our Menu
      </h2>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">{message}</p>
      </div>
    </div>
  </section>
);

export const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axiosInstance.get("/api/menu");

        if (!Array.isArray(response.data)) {
          throw new Error("Menu data is not in the expected format");
        }
        setTimeout(() => {
          setMenuData(response.data);
        }, 1000);

        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].category);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
        setError("Failed to load menu data. Please try again later.");
        // Keep loading true when there's an error
      }
    };

    fetchMenuData();
  }, []);

  // Show loading spinner for both loading and error states
  if (loading || error) {
    return <LoadingSpinner message={error || "Loading menu items..."} />;
  }

  if (!Array.isArray(menuData) || menuData.length === 0) {
    return <LoadingSpinner message="No menu items available. Please try again later." />;
  }

  const categories = menuData || [];
  const selectedCategoryItems = menuData.find((cat) => cat.category === selectedCategory)?.items || [];

  return (
    <section className="py-16 px-4 md:px-8 bg-background" id="menu">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-display text-primary mb-8 text-center animate-fade-in">
          Our Menu
        </h2>

        {/* Mobile Select */}
        <div className="block md:hidden mb-8">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.category} value={category.category}>
                  {category.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:block mb-8">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex p-4 space-x-4 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category.category}
                  variant={selectedCategory === category.category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.category)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {category.category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {selectedCategoryItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in h-48"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display text-lg line-clamp-2">{item.name}</h3>
                  <span className="font-sans text-primary font-semibold whitespace-nowrap">
                    ${item.price}
                  </span>
                </div>
                <Button
                  className="w-full mt-auto"
                  onClick={() => addItemToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};