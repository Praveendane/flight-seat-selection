
import { Plane, Clock, ArrowRight } from "lucide-react";

function FlightInfo() {
  return (
    <section className="flight-info">
      <div className="flight-heading">
        <div>
          <p className="eyebrow">YOUR JOURNEY</p>
          <h1>Select your seats</h1>
          <p className="subtitle">
            Choose your preferred seats and travel in comfort.
          </p>
        </div>

        <div className="flight-status">
          <span className="status-dot"></span>
          Flight confirmed
        </div>
      </div>

      <div className="flight-card">
        <div className="airport">
          <span className="airport-code">HYD</span>
          <span className="airport-name">Hyderabad</span>
          <span className="flight-time">08:30 AM</span>
        </div>

        <div className="flight-route">
          <span className="flight-duration">
            <Clock size={14} /> 2h 15m
          </span>
          <div className="route-line">
            <span></span>
            <Plane size={20} />
            <span></span>
          </div>
          <span className="flight-number">FL 204 · Non-stop</span>
        </div>

        <div className="airport destination">
          <span className="airport-code">BLR</span>
          <span className="airport-name">Bengaluru</span>
          <span className="flight-time">10:45 AM</span>
        </div>

        <div className="flight-date">
          <span>TRAVEL DATE</span>
          <strong>25 Nov 2026</strong>
          <span>Economy Class</span>
        </div>
      </div>
    </section>
  );
}

export default FlightInfo;
