import React, { useEffect, useState } from "react";
import axios from "axios";
import "./appointment.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewAppointment({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [mechanicUsernames, setMechanicUsernames] = useState({});
  const [availableSlots, setAvailableSlots] = useState({});
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newTimeSlot, setNewTimeSlot] = useState("");

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`http://localhost:3001/appointments/user/${user._id}`)
        .then(async (response) => {
          const appointmentsData = response.data.appointments;

          // Fetch mechanic usernames and available time slots for each appointment
          const usernames = {};
          const slots = {};
          for (const appointment of appointmentsData) {
            if (appointment.mechanicId && !usernames[appointment.mechanicId]) {
              const userResponse = await axios.get(
                `http://localhost:3001/user/${appointment.mechanicId}`
              );
              usernames[appointment.mechanicId] =
                userResponse.data.user.username;

              // Split availableTimeSlots string into an array
              const slotsArray =
                userResponse.data.user.availableTimeSlots.split(",");
              slots[appointment.mechanicId] = slotsArray;
            }
          }

          setMechanicUsernames(usernames);
          setAvailableSlots(slots);
          setAppointments(appointmentsData);
        })
        .catch((error) => {
          console.error("There was an error fetching the appointments!", error);
        });
    }
  }, [user]);

  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleConfirmReschedule = () => {
    if (selectedAppointment && newTimeSlot) {
      axios
        .put("http://localhost:3001/appointments/reschedule", {
          appointmentId: selectedAppointment._id,
          newTimeSlot,
        })
        .then((response) => {
          // Update the appointment status in the local state
          setAppointments((prevAppointments) =>
            prevAppointments.map((app) =>
              app._id === selectedAppointment._id
                ? { ...app, status: "Pending", timeSlot: newTimeSlot }
                : app
            )
          );
          setShowRescheduleModal(false);
          toast.success("Appointment rescheduled successfully!");
        })
        .catch((error) => {
          console.error(
            "There was an error rescheduling the appointment!",
            error
          );
        });
    }
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      axios
        .put("http://localhost:3001/appointments/status", {
          appointmentId: selectedAppointment._id,
          status: "Cancelled",
        })
        .then((response) => {
          // Update the appointment status in the local state
          setAppointments((prevAppointments) =>
            prevAppointments.map((app) =>
              app._id === selectedAppointment._id
                ? { ...app, status: "Cancelled" }
                : app
            )
          );
          setShowCancelModal(false);
          toast.success("Appointment canceled successfully!");
        })
        .catch((error) => {
          console.error("There was an error canceling the appointment!", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-center mb-4">My Appointments</h2>
      <div className="appoit-table">
        <table className="table ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mechanic Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time Slot</th>
              <th scope="col">Service</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {mechanicUsernames[appointment.mechanicId] || "Loading..."}
                </td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.service}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === "Accepted" && (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleRescheduleClick(appointment)}
                      >
                        Reschedule
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancelClick(appointment)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reschedule Modal */}
      <Modal
        show={showRescheduleModal}
        onHide={() => setShowRescheduleModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <Form>
              <Form.Group controlId="formNewTimeSlot">
                <Form.Label>Select New Time Slot</Form.Label>
                <Form.Control
                  as="select"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                >
                  <option value="">Select a slot</option>
                  {(availableSlots[selectedAppointment?.mechanicId] || []).map(
                    (slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    )
                  )}
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRescheduleModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmReschedule}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel this appointment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No, Go Back
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
