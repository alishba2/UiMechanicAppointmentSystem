import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import Navbar from "../../Components/Navbar";
import styles from "./mechanicListing.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import dp from "../../Components/assets/dp.png";

import { useNavigate } from "react-router-dom";
export default function MechanicListing() {
  const [mechanics, setMechanics] = useState([]);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/mechanics")
      .then((response) => response.json())
      .then((data) => {
        const parsedMechanics = data.mechanics.map((mechanic) => ({
          ...mechanic,
        }));
        setMechanics(parsedMechanics);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching mechanics:", error);
        setError("Failed to fetch mechanics. Please try again later.");
        setLoading(false);
      });
  }, []);

  function parseSkills(skillsStr) {
    try {
      const cleanedSkillsStr = skillsStr.replace(/\\/g, "");
      return JSON.parse(cleanedSkillsStr);
    } catch (e) {
      console.error("Failed to parse skills:", e);
      return [];
    }
  }

  useEffect(() => {
    const filtered = mechanics.filter(
      (mechanic) =>
        mechanic.skills
          .join(" ")
          .toLowerCase()
          ?.includes(searchTerm.toLowerCase()) ||
        mechanic.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMechanics(filtered);
  }, [searchTerm, mechanics]);

  const handleSetAppointment = (mechanic) => {
    navigate("/booking", { state: { mechanic } });
  };

  return (
    <>
      <Navbar />
      <Row
        className="my-4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col lg={6} md={4}>
          <Form.Control
            type="text"
            placeholder="Search by skill, name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
        </Col>
      </Row>

      {loading && (
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      )}

      {error && (
        <Row className="justify-content-center">
          <Alert variant="danger">{error}</Alert>
        </Row>
      )}

      {!loading && !error && (
        <div className="mech-list">
          {filteredMechanics.length > 0 ? (
            filteredMechanics.map((mechanic) => (
              <div key={mechanic._id} className="card-inner">
                <Card className={styles["card-custom"]}>
                  <Card.Img
                    variant="top"
                    src={mechanic?.profileImage || dp}
                    alt={mechanic.username}
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "50px",
                      objectFit: "cover",
                      margin: "auto",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        color: "green",
                        fontSize: "26px",
                        textTransform: "uppercase",
                        textDecoration: "underline",
                      }}
                    >
                      {mechanic.username}
                    </Card.Title>
                    <Card.Text style={{ color: "black" }}>
                      <strong>Skills:</strong> {mechanic.skills.join(", ")}
                    </Card.Text>
                    <Card.Text style={{ color: "black" }}>
                      <strong>Hourly Rate:</strong> ${mechanic.hourlyRating}
                    </Card.Text>
                    <Card.Text style={{ color: "black" }}>
                      <strong>Availability:</strong>{" "}
                      {mechanic.availableTimeSlot}
                    </Card.Text>
                    <Button
                      onClick={() => handleSetAppointment(mechanic)}
                      variant="primary"
                      style={{
                        width: "200px",
                        backgroundColor: "green",
                      }}
                    >
                      Book Appointment
                    </Button>
                    {/* <Button
                      style={{
                        width: "200px",
                        backgroundColor: "white",
                        color: "green",
                        border: "1px solid green",
                        marginTop: "-5px",
                      }}
                      onClick={() => {
                        navigate("/mechanics-detail");
                      }}
                    >
                      See Detail
                    </Button> */}
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <Col>
              <Alert variant="info">
                No mechanics found matching your search criteria.
              </Alert>
            </Col>
          )}
        </div>
      )}
    </>
  );
}
