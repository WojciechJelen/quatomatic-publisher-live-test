import React, { useState } from 'react';
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
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [signupError, setSignupError] = useState(null);

  if (signupError) {
    throw signupError;
  }

  async function handleCreateAccount() {
    setIsCreatingAccount(true);

    try {
      const response = await fetch('/signup/session.json');
      const session = await response.json();

      if (!session.signupToken) {
        throw new Error('Signup session token is missing');
      }
    } catch (error) {
      console.error('Unable to initialize signup session', error);
      setSignupError(error);
      throw error;
    }
  }

  if (isCreatingAccount) {
    return null;
  }

  return (
    <main className="shell signup-shell">
      <section className="signup-panel" aria-labelledby="signup-title">
        <p className="eyebrow">Signup feature</p>
        <h1 id="signup-title">Create your account</h1>
        <p className="signup-copy">Start publishing with a cleaner account setup flow.</p>
      </section>
      <form className="form signup-form">
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" placeholder="person@example.com" />
        </label>
        <label className="field">
          <span>Password</span>
          <input name="password" type="password" placeholder="At least 12 characters" />
        </label>
        <button type="button" onClick={handleCreateAccount}>
          Create account
        </button>
      </form>
      <p className="status">Signup route rendered successfully.</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
