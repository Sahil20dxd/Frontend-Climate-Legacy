import { Carousel, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { questions } from './questionsConfig';

export default function Questions({ activeIndex, setActiveIndex, formData, setFormData }) {
  const totalSteps = questions.length;
  const [animationCompleted, setAnimationCompleted] = useState(true);
  const [errors, setErrors] = useState({});

  const handleSelect = (selectedIndex) => {
    setAnimationCompleted(false);
    setActiveIndex(selectedIndex);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateInput = (name, value) => {
    const question = questions.find(q => q.name === name);
    if (!value.trim()) return 'This field is required.';

    if (question.name.includes('email') && !/\S+@\S+\.\S+/.test(value)) return 'Invalid email format.';
    if (question.name.includes('year') && !/^\d{4}$/.test(value)) return 'Invalid year. Must be 4 digits.';
    if (question.name.includes('age') && !/^\d+$/.test(value)) return 'Invalid number. Must be a valid age.';
    if (question.name.includes('number') && !/^\d+$/.test(value)) return 'Invalid number.';
    if (question.name.includes('zip') && value.length < 4) return 'Invalid ZIP code.';
    
    return '';
  };

  const goToNext = () => {
    const currentStep = questions[activeIndex];
    const errorMessage = validateInput(currentStep.name, formData[currentStep.name] || '');

    if (errorMessage) {
      setErrors({ ...errors, [currentStep.name]: errorMessage });
      return;
    }

    setAnimationCompleted(false);
    setActiveIndex(Math.min(activeIndex + 1, totalSteps - 1));
  };

  const goToPrev = () => {
    setAnimationCompleted(false);
    setActiveIndex(Math.max(activeIndex - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={handleSelect}
      controls={false}
      indicators={false}
      interval={null}
      onSlid={() => setAnimationCompleted(true)}
    >
      {questions.map((stepConfig) => (
        <Carousel.Item key={stepConfig.step}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId={`formStep${stepConfig.step}`}>
              <Form.Label className="q1">{stepConfig.label}</Form.Label>
              <Form.Control
                type={stepConfig.type || 'text'} 
                name={stepConfig.name}
                value={formData[stepConfig.name] || ''}
                onChange={handleChange}
                placeholder={stepConfig.placeholder}
                className="qinput"
                required
              />

              {errors[stepConfig.name] && (
                <div style={{ color: 'red', marginTop: '5px' }}>{errors[stepConfig.name]}</div>
              )}
            </Form.Group>

            {/* Added margin between input and buttons */}
            <div style={{ marginTop: '20px' }} />

            <div className="navigation-buttons">
              {activeIndex > 0 && animationCompleted && (
                <Button variant="secondary" onClick={goToPrev}>
                  Previous
                </Button>
              )}

              {activeIndex < totalSteps - 1 ? (
                <Button
                  variant="primary"
                  onClick={goToNext}
                  style={{ visibility: animationCompleted ? 'visible' : 'hidden' }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="success"
                  type="submit"
                  style={{ visibility: animationCompleted ? 'visible' : 'hidden' }}
                >
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
