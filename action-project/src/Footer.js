import React from 'react'
import express from './assets/express.png';
import node from './assets/node.png';
import react from './assets/react.png';

export default function Footer() {
  return (
    <footer>
         <div>
            <h3>A Lambda School Project</h3>
            <p><strong>Built with:</strong></p>
         </div>
        <div className='tech'>
            <img src={react} alt='react'/>
            <img src={node} alt='node'/>
            <img src={express} alt='express'/>
        </div>
    </footer>
  )
}
