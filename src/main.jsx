import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const path = window.location.pathname;

  if (path === '/signup') {
    return <Signup />;
  }

  return (
    <main className="shell">
      <p className="eyebrow">Quatomatic fixture</p>
      <h1>Preview with a broken feature branch</h1>
      <p>The homepage still renders, but the signup feature is broken in this PR.</p>
      <a href="/signup">Open signup flow</a>
    </main>
  );
}

function Signup() {
  throw new Error('Signup form failed to initialize: missing submit handler');
}

createRoot(document.getElementById('root')).render(<App />);
