import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader"; // Importing PacmanLoader

const EditBooking = () => {
  const { bookingid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    totalprice: "",
    depositpaid: false,
    checkin: "",
    checkout: "",
  });

  const [dialogVisible, setDialogVisible] = useState(false);
  const [updatedBookingId, setUpdatedBookingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/booking/${bookingid}`);
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
          throw new Error("Failed to fetch booking details.");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchBookingDetails();
  }, [bookingid]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/booking/${bookingid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic YWRtaW46cGFzc3dvcmQxMjM=`,
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
        setUpdatedBookingId(data.bookingid); // Set the updated booking ID
        setDialogVisible(true); // Show the dialog
      } else {
        throw new Error("Failed to update booking.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#B3C8CF]">
      {/* Loading Spinner if the page is loading */}
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
                    onClick={() => navigate("/bookings")}
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
            <span className="text-l font-bold mb- text-gray-700">
              {" "}
              First Name{" "}
            </span>
            <input
              type="text"
              name="firstname"
              placeholder=""
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 "
            />
            <span className="text-l font-bold mb- text-gray-700">
              {" "}
              Last Name{" "}
            </span>
            <input
              type="text"
              name="lastname"
              placeholder=""
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full mb-4 mt-2 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <span className="text-l font-bold mb- text-gray-700">
              {" "}
              Total Price
            </span>
            <input
              type="number"
              name="totalprice"
              placeholder=""
              value={formData.totalprice}
              onChange={handleChange}
              required
              className="w-full mb-4 mt-2 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <label className="flex items-center mb-4 text-l font-bold mb- text-gray-700">
              <input
                type="checkbox"
                name="depositpaid"
                checked={formData.depositpaid}
                onChange={handleChange}
                className="mr-2"
              />
              Deposit Paid
            </label>
            <input
              type="date"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              required
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 text-l font-bold mb- text-gray-700"
            />
            <input
              type="date"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              required
              className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 text-l font-bold mb- text-gray-700"
            />
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
