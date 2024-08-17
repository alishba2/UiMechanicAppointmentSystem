import React, { useEffect, useState } from "react";
import axios from "axios";
import "./appointment.scss";
import { Modal, Button } from "react-bootstrap";

const Appointment = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    if (user?._id) {
      // Fetch appointments by mechanicId
      axios
        .get(`http://localhost:3001/appointments/mechanic/${user._id}`)
        .then((response) => {
          setAppointments(response.data.appointments);
          // Fetch usernames for each appointment's user ID
          response.data.appointments.forEach((appointment) => {
            axios
              .get(`http://localhost:3001/user/${appointment.userId}`)
              .then((userResponse) => {
                setUsernames((prevUsernames) => ({
                  ...prevUsernames,
                  [appointment.userId]: userResponse.data.user.username,
                }));
              })
              .catch((error) => {
                console.error(
                  "There was an error fetching the user data!",
                  error
                );
              });
          });
        })
        .catch((error) => {
          console.error("There was an error fetching the appointments!", error);
        });
    }
  }, [user?._id]);

  const handleActionClick = (appointment, type) => {
    setSelectedAppointment(appointment);
    setActionType(type);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (selectedAppointment) {
      const status = actionType === "accept" ? "Accepted" : "Rejected";
      axios
        .put("http://localhost:3001/appointments/status", {
          appointmentId: selectedAppointment._id,
          status,
        })
        .then((response) => {
          // Update the appointment status in the local state
          setAppointments((prevAppointments) =>
            prevAppointments.map((app) =>
              app._id === selectedAppointment._id
                ? { ...app, status: response.data.appointment.status }
                : app
            )
          );
          setShowModal(false);
        })
        .catch((error) => {
          console.error(
            "There was an error updating the appointment status!",
            error
          );
        });
    }
  };

  return (
    <div className="appointment-main-div  mt-5">
      <h2 className="text-center mb-4">Appointments for Mechanic</h2>
      <div className="appoit-table">
        <table
          className="table  w-100"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Date</th>
              <th scope="col">Time Slot</th>
              <th scope="col">Service</th>
              <th scope="col">Actions/Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <th scope="row">{index + 1}</th>
                <td>{usernames[appointment.userId] || "Loading..."}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.service}</td>
                <td>
                  {appointment.status === "Accepted" ||
                  appointment.status === "Rejected" ||
                  appointment.status === "Cancelled" ? (
                    <span>{appointment.status}</span>
                  ) : (
                    <>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => handleActionClick(appointment, "accept")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger mx-3"
                        onClick={() => handleActionClick(appointment, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm {actionType === "accept" ? "Acceptance" : "Rejection"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              Are you sure you want to {actionType} the appointment for{" "}
              <strong>{usernames[selectedAppointment.userId]}</strong> on{" "}
              <strong>
                {new Date(selectedAppointment.date).toLocaleDateString()}
              </strong>{" "}
              at <strong>{selectedAppointment.timeSlot}</strong>?
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{ background: "red" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmAction}
            style={{ marginLeft: "20px", background: "green" }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointment;
