import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="flex justify-between px-20 py-10 items-center bg-white">
        <h1
          onClick={() => navigate("")}
          className="mb-4 text-3xl font-extrabold text-gray-90 dark:text-blue
         md:text-3xl lg:text-4xl text-left ml-4 mt-5 cursor-pointer"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Knowledge
          </span>{" "}
          Synonyms Assesment
        </h1>
        <div className="flex items-center">
          <ul className="flex items-center space-x-4 md:space-x-4 lg:space-x-8">
            <li
              onClick={() => navigate("")}
              className="font-semibold text-gray-700 cursor-pointer md:text-s lg:text-s"
            >
              Create Booking
            </li>
            <li
              onClick={() => navigate("bookings")}
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
