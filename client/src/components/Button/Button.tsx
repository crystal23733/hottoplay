'use client';

import React from 'react';
import ButtonProps from './Props/buttonProps';

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Button;
