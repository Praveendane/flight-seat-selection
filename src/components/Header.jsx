import {Plane, UserRound, Menu} from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
          <Plane size={23} />
        </div>
        <span>sky<span className="brand-highlight">line</span></span>
      </div>

      <nav className="nav-links">
        <a href="#flights">Flights</a>
        <a href="#bookings">My Bookings</a>
        <a href="#support">Support</a>
      </nav>

      <div className="header-actions">
        <div className="user-profile">
          <div className="avatar">PD</div>
          <span>Guest User</span>
        </div>
        <Menu className="mobile-menu" size={24} />
      </div>
    </header>
  );
}

export default Header;
