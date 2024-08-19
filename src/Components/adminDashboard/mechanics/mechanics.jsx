import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get("http://localhost:3001/mechanics");
        setMechanics(response.data.mechanics);
      } catch (error) {
        console.error("Error fetching mechanics", error);
      }
    };

    fetchMechanics();
  }, []);

  const handleDeleteClick = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMechanic) {
      try {
        await axios.delete(
          `http://localhost:3001/user/${selectedMechanic._id}`
        );
        setMechanics(mechanics.filter((m) => m._id !== selectedMechanic._id));
        setShowDeleteModal(false);
        setSelectedMechanic(null);
      } catch (error) {
        console.error("Error deleting mechanic", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedMechanic(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">ALL Mechanics</h2>
      <div className="appoit-table">
        <table className="table ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Contact No</th>
              <th scope="col">Skills</th>
              <th scope="col">Experience</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.length > 0 ? (
              mechanics.map((mechanic, index) => (
                <tr key={mechanic._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{mechanic.username}</td>
                  <td>{mechanic.role}</td>
                  <td>{mechanic.contactNo}</td>
                  <td>{mechanic.skills.join(", ")}</td>
                  <td>{mechanic.yrsOfExperience} years</td>
                  <td>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDeleteClick(mechanic)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No mechanics found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Mechanic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedMechanic?.username}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="mx-2">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Mechanics;
