import React, { useEffect, useState } from 'react';
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
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: '',
    password: '',
    workspace: '',
    plan: 'starter',
  });
  const [recommendation, setRecommendation] = useState(null);
  const [fatalError, setFatalError] = useState(null);

  useEffect(() => {
    if (step !== 3) {
      return;
    }

    let isCurrent = true;

    async function loadRecommendation() {
      try {
        const response = await fetch('/signup/recommendation.json');
        const data = await response.json();

        if (isCurrent) {
          setRecommendation(data.plans[form.plan]);
        }
      } catch (error) {
        if (isCurrent) {
          setFatalError(error);
        }
      }
    }

    loadRecommendation();

    return () => {
      isCurrent = false;
    };
  }, [form.plan, step]);

  if (fatalError) {
    throw fatalError;
  }

  const canContinue =
    step === 1
      ? form.email.includes('@') && form.password.length >= 8
      : form.workspace.trim().length >= 2;

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <main className="shell signup-shell">
      <p className="eyebrow">Signup feature</p>
      <h1>Create your account</h1>
      <ol className="steps" aria-label="Signup progress">
        <li className={step === 1 ? 'active' : ''}>Account</li>
        <li className={step === 2 ? 'active' : ''}>Workspace</li>
        <li className={step === 3 ? 'active' : ''}>Review</li>
      </ol>
      <form className="form wizard-form">
        {step === 1 && (
          <>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="person@example.com"
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={updateField}
                placeholder="At least 8 characters"
              />
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <label>
              Workspace name
              <input
                name="workspace"
                value={form.workspace}
                onChange={updateField}
                placeholder="Acme Publishing"
              />
            </label>
            <label>
              Plan
              <select name="plan" value={form.plan} onChange={updateField}>
                <option value="starter">Starter</option>
                <option value="team">Team</option>
              </select>
            </label>
          </>
        )}

        {step === 3 && (
          <section className="summary" aria-live="polite">
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Workspace:</strong> {form.workspace}
            </p>
            <p>
              <strong>Recommended setup:</strong> {recommendation?.label || 'Loading...'}
            </p>
          </section>
        )}

        <div className="actions">
          {step > 1 && (
            <button type="button" className="secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" disabled={!canContinue} onClick={() => setStep(step + 1)}>
              Continue
            </button>
          ) : (
            <button type="button">Create account</button>
          )}
        </div>
      </form>
      <p className="status">Signup route rendered successfully.</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
