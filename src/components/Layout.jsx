import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="container grid">
      <Nav />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
