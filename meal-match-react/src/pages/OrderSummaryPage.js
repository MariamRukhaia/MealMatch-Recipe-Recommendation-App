import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  const totalPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {}
      <NavBar />

      <div className="flex flex-col items-center justify-center min-h-[80vh] mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Order Summary</h2>

        <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2 gap-x-2">
            <p>
              {item.product_name} (x{item.quantity}) {/* Use `product_name` instead of `name` */}
            </p>
            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

          <div className="flex justify-between font-bold text-lg mt-4">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          <button
            onClick={() => navigate("/confirmation")}
            className="mt-6 w-full px-6 py-3 bg-[#F1A030] text-white font-bold rounded-md hover:bg-orange-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummaryPage;
