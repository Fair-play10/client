import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { CartProvider } from "./components/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <CartProvider>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        </CartProvider>
      </BrowserRouter>

  </QueryClientProvider>
);

export default App;
