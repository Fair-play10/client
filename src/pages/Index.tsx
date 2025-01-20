import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { ContactForm } from "@/components/ContactForm";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";
import Feedback from "@/components/FeedBack";
import { CartProvider } from "@/components/CartContext";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

const Index: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const taxRate = 0.1; // 10% tax
  const subtotal = calculateSubtotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className={`relative min-h-screen bg-background ${isCartOpen ? "overflow-hidden" : ""}`}>
      {/* Main Content */}
      <div className={`${isCartOpen ? "blur-sm bg-opacity-50 pointer-events-none" : ""}`}>
        <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        <Hero />
        <Menu />
        <section id="contact">
          <ContactForm />
        </section>
        <section id="reservations">
          <Reservations />
        </section>
        <section id="feedback">
          <Feedback />
        </section>
        <Footer />
      </div>

      {/* Shopping Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            <div className="max-h-72 overflow-y-auto space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => addItemToCart(item)}
                      >
                        +
                      </button>
                      <button
                        className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => removeItemFromCart(item.id, true)}
                      >
                        -
                      </button>
                      <button
                        className="px-2 py-1 text-sm text-red-500 hover:underline"
                        onClick={() => removeItemFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-700">Your cart is empty. Add some items!</p>
              )}
            </div>

            {/* Summary Section */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded w-full"
              onClick={() => setIsCartOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
