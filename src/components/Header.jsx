import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for programmatic navigation

export default function Header() {
  const navigate = useNavigate(); // Initialize the navigate function for routing

  return (
    <div>
      {/* Navigation bar */}
      <nav className="flex justify-between px-20 py-10 items-center bg-white">
        {/* Logo or heading text */}
        <h1
          onClick={() => navigate("")} // Navigate to the home page when the heading is clicked
          className="mb-4 text-3xl font-extrabold text-gray-90 dark:text-blue
         md:text-3xl lg:text-4xl text-left ml-4 mt-5 cursor-pointer"
        >
          {/* Styled heading text with gradient effect */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Knowledge
          </span>{" "}
          Synonyms Assessment
        </h1>

        {/* Navigation links */}
        <div className="flex items-center">
          <ul className="flex items-center space-x-4 md:space-x-4 lg:space-x-8">
            {/* Link for "Create Booking" */}
            <li
              onClick={() => navigate("")} // Navigate to the home page or the create booking page when clicked
              className="font-semibold text-gray-700 cursor-pointer md:text-s lg:text-s"
            >
              Create Booking
            </li>

            {/* Link for "Booking List" */}
            <li
              onClick={() => navigate("bookings")} // Navigate to the bookings list page when clicked
              className="font-semibold cursor-pointer text-gray-700"
            >
              Booking List
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
