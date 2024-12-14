import { Routes, Route } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import EditBooking from "./components/EditBooking";
import "./index.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/edit/:bookingid" element={<EditBooking />} />
      </Routes>
    </div>
  );
};

export default App;
