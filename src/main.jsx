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
      <h1>Healthy preview</h1>
      <p>This page gives Quatomatic a stable passing target.</p>
      <a href="/signup">Open signup flow</a>
    </main>
  );
}

function Signup() {
  return (
    <main className="shell">
      <p className="eyebrow">Signup feature</p>
      <h1>Create your account</h1>
      <form className="form">
        <label>
          Email
          <input name="email" type="email" placeholder="person@example.com" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="At least 12 characters" />
        </label>
        <button type="button">Create account</button>
      </form>
      <p className="status">Signup route rendered successfully.</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
