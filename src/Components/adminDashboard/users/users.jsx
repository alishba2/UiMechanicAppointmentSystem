import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Users = () => {
  const [customers, setCustomers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/customers");
        setCustomers(response.data.customers);
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCustomer) {
      try {
        await axios.delete(
          `http://localhost:3001/user/${selectedCustomer._id}`
        );
        setCustomers(customers.filter((c) => c._id !== selectedCustomer._id));
        setShowDeleteModal(false);
        setSelectedCustomer(null);
      } catch (error) {
        console.error("Error deleting customer", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">ALL Customers</h2>
      <div className="appoit-table">
        <table className="table ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Contact No</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={customer._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{customer.username}</td>
                  <td>{customer.email}</td>
                  <td>{customer.role}</td>
                  <td>{customer.contactNo}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDeleteClick(customer)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedCustomer?.username}?
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

export default Users;
