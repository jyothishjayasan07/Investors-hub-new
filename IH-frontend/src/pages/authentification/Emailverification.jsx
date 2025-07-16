import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function EmailVerification() {
  const [message, setMessage] = useState('Verifying...');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    fetch(`http://localhost:3000/verify-email?token=${token}`)
      .then((res) => res.text())
      .then((msg) => setMessage(msg))
      .catch(() => setMessage("❌ Verification failed"));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>{message}</h2>
    </div>
  );
}

export default EmailVerification;
