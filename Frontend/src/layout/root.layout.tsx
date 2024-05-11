import { Outlet } from "react-router-dom";
import "../index.css";

function RootLayout() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default RootLayout;
