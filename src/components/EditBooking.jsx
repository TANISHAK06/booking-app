import { useState, useEffect } from "react"; // Import React hooks for state and side effects
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for route parameters and navigation
import PacmanLoader from "react-spinners/PacmanLoader"; // Import a spinner component for loading state

const EditBooking = () => {
  const { bookingid } = useParams(); // Get the booking ID from the route parameters
  const navigate = useNavigate(); // Initialize the navigate function for routing

  // State for form data and other UI behavior
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    totalprice: "",
    depositpaid: false,
    checkin: "",
    checkout: "",
  });

  const [dialogVisible, setDialogVisible] = useState(false); // Controls the visibility of the dialog
  const [updatedBookingId, setUpdatedBookingId] = useState(null); // Stores the updated booking ID
  const [isLoading, setIsLoading] = useState(true); // Tracks the loading status

  // Fetch booking details when the component loads
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/booking/${bookingid}`); // Fetch booking data from the server
        if (response.ok) {
          const data = await response.json();
          setFormData({
            firstname: data.firstname,
            lastname: data.lastname,
            totalprice: data.totalprice,
            depositpaid: data.depositpaid,
            checkin: data.bookingdates.checkin,
            checkout: data.bookingdates.checkout,
          });
        } else {
          throw new Error("Failed to fetch booking details."); // Handle errors if the request fails
        }
      } catch (error) {
        console.error("Error fetching booking details:", error); // Log the error
      } finally {
        setIsLoading(false); // Stop showing the loading spinner
      }
    };

    fetchBookingDetails();
  }, [bookingid]); // Dependency array ensures this effect runs when bookingid changes

  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Update state based on input type
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await fetch(`/api/booking/${bookingid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic YWRtaW46cGFzc3dvcmQxMjM=`, // Authentication header
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          totalprice: Number(formData.totalprice),
          depositpaid: formData.depositpaid,
          bookingdates: {
            checkin: formData.checkin,
            checkout: formData.checkout,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUpdatedBookingId(data.bookingid); // Store the updated booking ID
        setDialogVisible(true); // Show the success dialog
      } else {
        throw new Error("Failed to update booking."); // Handle server errors
      }
    } catch (error) {
      console.error("Error updating booking:", error); // Log the error
    }
  };

  // Close the success dialog
  const closeDialog = () => {
    setDialogVisible(false);
  };

  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `; // CSS for the loading spinner

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#B3C8CF]">
      {/* Show loading spinner while data is loading */}
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <PacmanLoader
            color={"#36D7B7"}
            isLoading={isLoading}
            css={override}
            size={40}
          />
        </div>
      ) : (
        <>
          {/* Show success dialog if the booking is updated */}
          {dialogVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-lg mb-4">
                  Your booking with booking ID: {bookingid} has been updated.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={closeDialog}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => navigate("/bookings")} // Navigate to the bookings list
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Booking List
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form for editing booking */}
          <form
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Edit Booking
            </h2>

            {/* First Name Input */}
            <label className="text-l font-bold text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Last Name Input */}
            <label className="text-l font-bold text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Total Price Input */}
            <label className="text-l font-bold text-gray-700">
              Total Price
            </label>
            <input
              type="number"
              name="totalprice"
              value={formData.totalprice}
              onChange={handleChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Deposit Paid Checkbox */}
            <label className="flex items-center mb-4 text-l font-bold text-gray-700">
              <input
                type="checkbox"
                name="depositpaid"
                checked={formData.depositpaid}
                onChange={handleChange}
                className="mr-2"
              />
              Deposit Paid
            </label>

            {/* Check-in Date */}
            <label className="text-l font-bold text-gray-700">
              Check-in Date
            </label>
            <input
              type="date"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Check-out Date */}
            <label className="text-l font-bold text-gray-700">
              Check-out Date
            </label>
            <input
              type="date"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              required
              className="w-full mt-2 mb-6 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Update
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditBooking;
