import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import Navbar from "../../Components/Navbar";
import dp from "../../Components/assets/dp.png"; // Default profile image

const MechanicDetailPage = () => {
  const { id } = useParams();
  const [mechanic, setMechanic] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // useEffect(() => {
  //   const fetchMechanicDetails = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3001/mechanics/${id}`);
  //       const data = await response.json();
  //       setMechanic(data.user);
  //       const reviewsResponse = await fetch(
  //         `http://localhost:3001/mechanics/${id}/reviews`
  //       );
  //       const reviewsData = await reviewsResponse.json();
  //       setReviews(reviewsData.reviews);
  //       setLoading(false);
  //     } catch (error) {
  //       setError("Failed to fetch mechanic details. Please try again later.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchMechanicDetails();
  // }, [id]);

  // const handleSubmitReview = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/mechanics/${id}/reviews`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ rating, comment }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       setReviews((prevReviews) => [...prevReviews, data.review]);
  //       setRating(5);
  //       setComment("");
  //     } else {
  //       setError(data.message || "Failed to add review. Please try again.");
  //     }
  //   } catch (error) {
  //     setError("Failed to add review. Please try again.");
  //   }
  // };

  return (
    <>
      <Navbar />
      <Container>
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
        {/* {mechanic && (
          <Row>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={mechanic.profileImage || dp}
                  alt={mechanic.username}
                />
                <Card.Body>
                  <Card.Title>{mechanic.username}</Card.Title>
                  <Card.Text>Skills: {mechanic.skills.join(", ")}</Card.Text>
                  <Card.Text>Hourly Rate: ${mechanic.hourlyRate}</Card.Text>
                  <Card.Text>
                    Availability: {mechanic.availableTimeSlot}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Form onSubmit={handleSubmitReview}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>
              <h3>Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review._id} className="mb-3">
                    <Card.Body>
                      <Card.Text>
                        <strong>Rating:</strong> {review.rating}
                      </Card.Text>
                      <Card.Text>
                        <strong>Comment:</strong> {review.comment}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </Col>
          </Row>
        )} */}

        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src={dp} alt="{mechanic.username}" />
              <Card.Body>
                <Card.Title>Arshia</Card.Title>
                <Card.Text>Skills: </Card.Text>
                <Card.Text>Hourly Rate: $</Card.Text>
                <Card.Text>Availability:</Card.Text>
              </Card.Body>
            </Card>
            <Form>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit Review
              </Button>
            </Form>
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review._id} className="mb-3">
                  <Card.Body>
                    <Card.Text>
                      <strong>Rating:</strong> {review.rating}
                    </Card.Text>
                    <Card.Text>
                      <strong>Comment:</strong> {review.comment}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MechanicDetailPage;
