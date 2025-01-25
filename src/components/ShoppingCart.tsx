import React, { FC, useState, createContext, useContext, ReactNode } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/CartContext";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}


interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  deliveryType: "takeout" | "delivery";
  date: string;
  status: "pending" | "processing" | "completed";
  address?: string;
  location?: Location;
  deliveryInstructions?: string;
}


const ShoppingCart: FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeItemFromCart, addItemToCart } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: "",
    phoneNumber: "",
    deliveryType: "takeout",
    date: new Date().toISOString().split('T')[0],
    status: "pending"
  });

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmitOrder = async () => {
    if (!orderDetails.customerName || !orderDetails.phoneNumber) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const paymentResult = await initiatePayment({
        amount: total,
        items: cartItems,
        customerDetails: orderDetails
      });
      
      if ((paymentResult as { success: boolean }).success) {
        alert("Order placed successfully!");
        onClose();
      }
    } catch (error) {
      alert("Payment failed. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {showOrderForm ? "Order Details" : "Shopping Cart"}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!showOrderForm ? (
            <>
              {cartItems.length > 0 ? (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <div className="flex items-center space-x-2 border rounded-md p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItemFromCart(item.id, true)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => addItemToCart(item)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItemFromCart(item.id)}
                          className="text-red-500"
                        >
                          Remove
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-700">Your cart is empty.</p>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={orderDetails.customerName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={orderDetails.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label>Delivery Type</Label>
                <RadioGroup
                  value={orderDetails.deliveryType}
                  onValueChange={(value) =>
                    setOrderDetails(prev => ({
                      ...prev,
                      deliveryType: value as "takeout" | "delivery"
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="takeout" id="takeout" />
                    <Label htmlFor="takeout">Take Out</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Pickup/Delivery Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={orderDetails.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">Order Summary</h3>
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          {cartItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {!showOrderForm ? (
                <Button
                  className="w-full bg-primary text-white hover:bg-primary-dark transition"
                  onClick={() => setShowOrderForm(true)}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowOrderForm(false)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-white hover:bg-primary-dark"
                    onClick={handleSubmitOrder}
                  >
                    Pay Now
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const initiatePayment = async ({ amount, items, customerDetails }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

export default ShoppingCart;