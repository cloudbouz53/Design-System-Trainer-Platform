// TEST FIXTURE — excluded from canonical promotion.
// Exercises: static imports, token refs (var(--)), rule citations (BTN-001, TOK-001).
// Dynamic import below is intentionally unsupported to test the unsupported reporter.

import React from 'react';
import './fixture.css'; // token-usage edge via CSS
// rule citation: BTN-001 BTN-002 TOK-001

interface Props {
  label: string;
}

export function FixtureButton({ label }: Props) {
  return (
    <button
      style={{ background: 'var(--color-background)', color: 'var(--color-text-primary)' }}
    >
      {label}
    </button>
  );
}

// Intentional unsupported construct for testing:
// import(`./${someVar}`) — dynamic import
