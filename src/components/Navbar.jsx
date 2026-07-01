import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-1 border-b bg-background px-6 py-3">
      <NavLink className="" end to="/">
        Home
      </NavLink>
      <NavLink className="" to="/recipes">
        Library
      </NavLink>
      <NavLink className="" to="/favorites">
        Favorites
      </NavLink>
    </nav>
  );
}
