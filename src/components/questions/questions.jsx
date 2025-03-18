import './questions.css';
import { Carousel, Form, Button } from 'react-bootstrap';
import React from 'react';
import { questions } from './questionsConfig'; // Correct import

export default function Questions({ activeIndex, setActiveIndex, formData, setFormData }) {
  const totalSteps = questions.length; // Changed to use 'questions'

  const handleSelect = (selectedIndex) => setActiveIndex(selectedIndex);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToNext = () => {
    try {
      const currentStep = questions[activeIndex]; // Changed to 'questions'
      if (currentStep.validation(formData[currentStep.name])) {
        setActiveIndex(Math.min(activeIndex + 1, totalSteps - 1));
      }
    } catch (error) {
      console.log(error.msg)
    }
  };

  const goToPrev = () => {
    setActiveIndex(Math.max(activeIndex - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    // Add submission logic
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={handleSelect}
      controls={false}
      indicators={false}
      interval={null}
    >
      {questions.map((stepConfig) => ( // Changed to 'questions'
        <Carousel.Item key={stepConfig.step}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId={`formStep${stepConfig.step}`}>
              <Form.Label className="q1">{stepConfig.label}</Form.Label>
              <Form.Control
                type="text"
                name={stepConfig.name}
                value={formData[stepConfig.name]}
                onChange={handleChange}
                placeholder={stepConfig.placeholder}
                className="qinput"
                required
              />
            </Form.Group>

            <div className="navigation-buttons">
              {activeIndex > 0 && (
                <Button variant="secondary" onClick={goToPrev}>
                  Previous
                </Button>
              )}

              {activeIndex < totalSteps - 1 ? (
                <Button variant="primary" onClick={goToNext}>
                  Next
                </Button>
              ) : (
                <Button variant="success" type="submit">
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}