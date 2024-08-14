import React from 'react';
import './FAQS.css';

const FAQS = () => {
  return (
    <div className="faq-container">
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our mechanical appointment system.</p>
      </header>
      <section className="faq-section">
        <div className="faq-item">
          <h2 className="faq-question">How do I book an appointment?</h2>
          <p className="faq-answer">To book an appointment, simply navigate to the 'Book Appointment' page, choose a mechanic, select a date and time, and confirm your booking.</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-question">Can I reschedule my appointment?</h2>
          <p className="faq-answer">Yes, you can reschedule your appointment by going to the 'My Appointments' section, selecting the appointment you wish to reschedule, and choosing a new date and time.</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-question">What should I do if I need to cancel?</h2>
          <p className="faq-answer">To cancel an appointment, go to the 'My Appointments' section, select the appointment you want to cancel, and click the 'Cancel' button.</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-question">Are your mechanics certified?</h2>
          <p className="faq-answer">Yes, all our mechanics are certified professionals with extensive experience in automotive repair and maintenance.</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-question">How can I contact customer support?</h2>
          <p className="faq-answer">You can contact our customer support by visiting the 'Contact Us' page and filling out the form, or by calling our support hotline at (123) 456-7890.</p>
        </div>
      </section>
    </div>
  );
};

export default FAQS;
