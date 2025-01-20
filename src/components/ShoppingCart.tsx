import { FC } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeItemFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="relative  inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="w-full space-y-4 overflow-y-auto max-h-[300px]">
          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItemFromCart(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-700">Your cart is empty.</p>
          )}
        </div>

      
        {cartItems.length > 0 && (
          <div className="mt-4">
            <Button
              className="w-full bg-primary text-white hover:bg-primary-dark transition"
              onClick={() => {
                alert("Checkout functionality not implemented yet!");
                onClose();
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
