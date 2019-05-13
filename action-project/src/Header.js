import React from 'react';
import lambdaLogo from './assets/lambda_logo.png';

export default function Header() {
  return (
    <header>
      <img src={lambdaLogo} alt='lambdalogo' />
      <h1>Lambda School Projects</h1>
    </header>
  )
}
