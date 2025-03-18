import './questions.css';
import { Carousel, Form, Button } from 'react-bootstrap';
import { questions } from './questions.js';
import React from 'react';

// Step configuration array
const QUESTION_STEPS = [
  {
    step: 1,
    name: 'step1Input',
    label: 'Step 1: Input your first value',
    placeholder: 'Enter a value',
    validation: value => value.trim() !== '' // Example validation
  },
  {
    step: 2,
    name: 'step2Input',
    label: 'Step 2: Input your second value',
    placeholder: 'Enter another value',
    validation: value => value.trim() !== ''
  },
  // Add new questions here:
  {
    step: 3,
    name: 'step3Input',
    label: 'Step 3: Input your third value',
    placeholder: 'Enter third value',
    validation: value => value.trim() !== ''
  }
];

export default function Questions({ activeIndex, setActiveIndex, formData, setFormData }) {
  const totalSteps = QUESTION_STEPS.length;

  const handleSelect = (selectedIndex) => setActiveIndex(selectedIndex);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToNext = () => {
    const currentStep = QUESTION_STEPS[activeIndex];
    if (currentStep.validation(formData[currentStep.name])) {
      setActiveIndex(Math.min(activeIndex + 1, totalSteps - 1));
    }
  };

  const goToPrev = () => {
    setActiveIndex(Math.max(activeIndex - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    // Add your submission logic here
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={handleSelect}
      controls={false}
      indicators={false}
      interval={null}
    >
      {QUESTION_STEPS.map((stepConfig, index) => (
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