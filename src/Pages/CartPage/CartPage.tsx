import React from "react";
import { Outlet } from "react-router-dom";

const CartPage = () => {
  return (
    <div>
      Cart
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CartPage;
