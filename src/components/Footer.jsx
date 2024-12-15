import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate("");
  return (
    <section className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <a
              href="https://www.linkedin.com/in/tanishak-shukla-692238204/"
              className="text-base leading-6 text-gray-500 hover:text-gray-900
              cursor-pointer"
            >
              {" "}
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              onClick={() => navigate("bookings")}
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Booking List
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              onClick={() => navigate("")}
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Create Booking
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              onClick={() => navigate("bookings")}
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Edit Booking
            </a>
          </div>
        </nav>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © Created By Tanishak Shukla For Knowledge Synonyms.
        </p>
      </div>
    </section>
  );
}
