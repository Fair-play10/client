import { Dispatch, SetStateAction, useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
interface NavbarProps {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({ isCartOpen, setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Reservations", href: "#reservations" },
    { name: "Contact", href: "#contact" },
    { name: "Feedback", href: "#feedback" },
  ];
  const { cartItems,removeItemFromCart } = useCart();


  return (
    <nav className="fixed top-0 left-0 right-0 bg-[white/90] backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="font-display text-3xl text-primary text-gradient-to-r from-purple-600 to-primary"
          >
            Monteverde
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href === "#home" ? "/" : item.href}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
          <Button
  variant="ghost"
  size="icon"
  onClick={() => setIsCartOpen(!isCartOpen)}
  className="relative"
>
  <ShoppingCart className="h-5 w-5" />
  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
    {cartItems.length}
  </span>
</Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
