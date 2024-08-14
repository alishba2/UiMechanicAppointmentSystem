import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import Navbar from '../../Components/Navbar';
import styles from './mechanicListing.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
export default function MechanicListing() {
    const [mechanics, setMechanics] = useState([]);
    const [filteredMechanics, setFilteredMechanics] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/mechanics')
            .then((response) => response.json())
            .then((data) => {
                const parsedMechanics = data.mechanics.map(mechanic => ({
                    ...mechanic
                }));
                setMechanics(parsedMechanics);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching mechanics:', error);
                setError('Failed to fetch mechanics. Please try again later.');
                setLoading(false);
            });
    }, []);

    function parseSkills(skillsStr) {
        try {
            const cleanedSkillsStr = skillsStr.replace(/\\/g, '');
            return JSON.parse(cleanedSkillsStr);
        } catch (e) {
            console.error('Failed to parse skills:', e);
            return [];
        }
    }

    useEffect(() => {
        const filtered = mechanics.filter((mechanic) =>
            mechanic.skills.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
            mechanic.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMechanics(filtered);
    }, [searchTerm, mechanics]);

    const handleSetAppointment = (mechanic) => {
        navigate('/booking', { state: { mechanic } });
    };

    return (
        <>
            <Navbar />
            <Container>
                <Row className="my-4">
                    <Col>
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
                    <Row>
                        {filteredMechanics.length > 0 ? (
                            filteredMechanics.map((mechanic) => (
                                <Col key={mechanic._id} md={4} className="mb-4">
                                    <Card className={styles['card-custom']}>
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3001/${mechanic?.profileImage}`}
                                            alt={mechanic.username}
                                            style={{ height: '40px', width: '50px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{mechanic.username}</Card.Title>
                                            <Card.Text>
                                                <strong>Skills:</strong> {mechanic.skills.join(', ')}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Hourly Rate:</strong> ${mechanic.hourlyRating}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Availability:</strong> {mechanic.availableTimeSlot}
                                            </Card.Text>
                                            <Button onClick={() => handleSetAppointment(mechanic)} variant="primary">Set Appointment</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <Alert variant="info">No mechanics found matching your search criteria.</Alert>
                            </Col>
                        )}
                    </Row>
                )}
            </Container>
        </>
    );
}
