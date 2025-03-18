export const questions = [
  {
    step: 1,
    name: 'step1Input',
    label: 'Step 1: Input your first value',
    placeholder: 'Enter a value',
    validation: value => value.trim() !== ''
  },
  {
    step: 2,
    name: 'step2Input',
    label: 'Step 2: Input your second value',
    placeholder: 'Enter another value',
    validation: value => value.trim() !== ''
  },
  // Add more questions here as needed
];