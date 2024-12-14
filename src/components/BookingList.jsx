import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // State for visible entries
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking");
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
          setFilteredBookings(data);
        } else {
          throw new Error("Failed to fetch bookings.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) =>
        booking.bookingid.toString().includes(query)
      );
      setFilteredBookings(filtered);
    }
    setVisibleCount(10); // Reset visible count when searching
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Increase visible count by 10
  };

  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 bg-[#B3C8CF]">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        List of Bookings
      </h2>

      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3">
            <div className="relative">
              <i className="absolute fa fa-search text-gray-400 top-5 left-4"></i>
              <input
                type="text"
                placeholder="Search by Booking ID"
                value={searchQuery}
                name="bookingid"
                required
                onChange={handleSearch}
                className="bg-white h-14 w-full px-12 mb-5 rounded-lg focus:outline-none hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex mt-24 justify-center min-h-screen">
          <PacmanLoader
            color={"rgb(5 150 105)"}
            isLoading={isLoading}
            css={override}
            size={40}
          />
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {filteredBookings.length > 0 ? (
            <>
              <ul>
                {filteredBookings.slice(0, visibleCount).map((booking) => (
                  <li
                    key={booking.bookingid}
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4"
                  >
                    <span className="text-gray-600">
                      Booking ID: {booking.bookingid}
                    </span>
                    <Link
                      to={`/edit/${booking.bookingid}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
              {visibleCount < filteredBookings.length && (
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Show More
                </button>
              )}
            </>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingList;
