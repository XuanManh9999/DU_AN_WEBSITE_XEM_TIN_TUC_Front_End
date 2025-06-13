import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
export default function Base() {
  return (
    <div className="base">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
