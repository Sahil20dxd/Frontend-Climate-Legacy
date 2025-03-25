import React, { useEffect } from 'react';

export default function Questions() {
  useEffect(() => {
    // Load the Typeform embed script dynamically
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        data-tf-live="01JQ71JGH7YAC62FWY057FEPTP"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
