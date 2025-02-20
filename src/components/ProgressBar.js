import React from 'react';

function ProgressBar({ currentStep, totalSteps }) {
  const circles = [];
  for (let i = 0; i < totalSteps; i++) {
    circles.push(
      <div
        key={i}
        className={`step-circle ${i === currentStep ? 'active' : ''}`}
      />
    );
  }

  return <div className="progress-bar">{circles}</div>;
}

export default ProgressBar;
