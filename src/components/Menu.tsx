import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCart } from "@/components/CartContext"; 

interface MenuItem {
  id: number; // Add a unique `id` field for compatibility with the cart
  name: string;
  price: number;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    category: "House Charcuterie",
    items: [
      { id: 1, name: "Duck Liver Mousse", price: 9 },
      { id: 2, name: "Pork Rillettes", price: 9 },
      { id: 3, name: "Soppressata", price: 9 },
      { id: 4, name: "Coppa", price: 9 },
      { id: 5, name: "Bresaola", price: 9 },
      { id: 6, name: "Smoked Lamb Summer Sausage", price: 9 },
      { id: 7, name: "Pork & Bacon Terrine", price: 9 },
      { id: 8, name: "Porchetta", price: 9 },
    ],
  },
  {
    category: "Cheese",
    items: [
      { id: 9, name: "Hornkuhkase (Switzerland)", price: 9 },
      { id: 10, name: "Dream Weaver (California)", price: 9 },
      { id: 11, name: "Mimolette Vieille (France)", price: 9 },
      { id: 12, name: "Prairie Breeze Cheddar (Iowa)", price: 9 },
      { id: 13, name: "Delice de Bourgogne (France)", price: 9 },
    ],
  },
  {
    category: "Plates",
    items: [
      { id: 14, name: "House Charcuterie Selection", price: 24 },
      { id: 15, name: "Artisanal Cheese Plate", price: 24 },
      { id: 16, name: "Cheese & Charcuterie Plate", price: 30 },
    ],
  },
];

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    menuData.length > 0 ? menuData[0].category : ""
  );

  const { addItemToCart } = useCart(); // Use the CartProvider context

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
              {menuData.map((category) => (
                <SelectItem
                  key={category.category}
                  value={category.category}
                >
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
              {menuData.map((category) => (
                <Button
                  key={category.category}
                  variant={
                    selectedCategory === category.category
                      ? "default"
                      : "outline"
                  }
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
          {menuData
            .find((cat) => cat.category === selectedCategory)
            ?.items.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display text-lg">{item.name}</h3>
                    <span className="font-sans text-primary font-semibold">
                      ${item.price}
                    </span>
                  </div>
                  <Button
                    className="mt-4 w-full"
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
