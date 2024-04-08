import { Outlet } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";
import "../index.css";

function RootLayout() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default RootLayout;
