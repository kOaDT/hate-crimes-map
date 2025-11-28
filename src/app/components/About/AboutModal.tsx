'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AboutContent from './AboutContent';

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSeenModal = localStorage.getItem('hasSeenAboutModal');
    if (!hasSeenModal) {
      Promise.resolve().then(() => setIsOpen(true));
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenAboutModal', 'true');
  };

  if (!isOpen) return null;

  return createPortal(
    <div className='modal-overlay' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='modal-container'>
        <div className='modal-backdrop cursor-pointer' onClick={closeModal} />
        <div className='modal-content'>
          <button onClick={closeModal} className='modal-close-button' aria-label='Close modal'>
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          <div className='modal-body'>
            <AboutContent />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
