import { useState, useEffect } from "react"; // Import hooks for state management and lifecycle
import { Link } from "react-router-dom"; // Import Link for navigation between routes
import PacmanLoader from "react-spinners/PacmanLoader"; // Import a loading spinner for better UX

const BookingList = () => {
  // State to store all bookings fetched from the API
  const [bookings, setBookings] = useState([]);
  // State for the current search query
  const [searchQuery, setSearchQuery] = useState("");
  // State to store the filtered bookings based on the search query
  const [filteredBookings, setFilteredBookings] = useState([]);
  // State to control how many bookings are visible at once
  const [visibleCount, setVisibleCount] = useState(10);
  // State to indicate if data is still loading
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bookings from the API when the component is first rendered
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking"); // Make a GET request to fetch bookings
        if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          setBookings(data); // Save the full list of bookings
          setFilteredBookings(data); // Initialize the filtered bookings with all bookings
        } else {
          throw new Error("Failed to fetch bookings."); // Handle API errors
        }
      } catch (error) {
        console.error("Error fetching bookings:", error); // Log errors if fetching fails
      } finally {
        setIsLoading(false); // Stop the loading spinner once fetching is done
      }
    };

    fetchBookings(); // Call the fetch function
  }, []); // Empty dependency array means this runs only once, when the component loads

  // Update the search query and filter bookings based on it
  const handleSearch = (e) => {
    const query = e.target.value; // Get the search input value
    setSearchQuery(query); // Update the search query state

    if (query === "") {
      setFilteredBookings(bookings); // If search is cleared, show all bookings
    } else {
      // Filter bookings based on whether their booking ID includes the search query
      const filtered = bookings.filter((booking) =>
        booking.bookingid.toString().includes(query)
      );
      setFilteredBookings(filtered);
    }
    setVisibleCount(10); // Reset visible bookings count when a new search is performed
  };

  // Increase the number of visible bookings when "Show More" is clicked
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Add 10 more bookings to the visible list
  };

  // CSS styles for the loading spinner
  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    // Container for the booking list, styled for alignment and background color
    <div className="min-h-screen flex flex-col items-center justify-start py-8 bg-[#B3C8CF]">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        List of Bookings
      </h2>

      {/* Search bar section */}
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3">
            <div className="relative">
              <i className="absolute fa fa-search text-gray-400 top-5 left-4"></i>
              {/* Input field to search bookings by their ID */}
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
        // Show the loading spinner while data is being fetched
        <div className="flex mt-24 justify-center min-h-screen">
          <PacmanLoader
            color={"rgb(5 150 105)"}
            isLoading={isLoading}
            css={override}
            size={40}
          />
        </div>
      ) : (
        // Display the bookings list once data is loaded
        <div className="w-full max-w-2xl">
          {filteredBookings.length > 0 ? (
            <>
              <ul>
                {/* Display a limited number of bookings based on visibleCount */}
                {filteredBookings.slice(0, visibleCount).map((booking) => (
                  <li
                    key={booking.bookingid}
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4"
                  >
                    {/* Show booking ID */}
                    <span className="text-gray-600">
                      Booking ID: {booking.bookingid}
                    </span>
                    {/* Link to edit the booking */}
                    <Link
                      to={`/edit/${booking.bookingid}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Button to load more bookings if not all are visible */}
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
            // Display a message if no bookings match the search
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingList;
