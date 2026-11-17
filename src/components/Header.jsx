
import { Plane, Menu } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
          <Plane size={23} aria-hidden="true" />
        </div>

        <span>
          sky<span className="brand-highlight">line</span>
        </span>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="#flights">Flights</a>
        <a href="#bookings">My Bookings</a>
        <a href="#support">Support</a>
      </nav>

      <div className="header-actions">
        <div className="user-profile">
          <div className="avatar" aria-hidden="true">
            PD
          </div>
          <span>Guest User</span>
        </div>

        <Menu
          className="mobile-menu"
          size={24}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}

export default Header;
