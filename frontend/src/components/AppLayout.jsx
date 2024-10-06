import React from "react";
import NavComponent from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <NavComponent />
      <div className="app-layout">
        <main
          className="content"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;
