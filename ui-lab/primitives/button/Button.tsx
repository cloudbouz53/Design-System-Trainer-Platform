// Rules: BTN-001 BTN-002 BTN-003 BTN-004 TOK-001 TOK-002 TOK-003
import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
}: ButtonProps) {
  const isInteractive = !disabled && !loading;

  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading ? 'true' : undefined}
      aria-busy={loading ? 'true' : undefined}
      onClick={isInteractive ? onClick : undefined}
    >
      {loading && (
        <>
          <span className="btn__spinner" aria-hidden="true" />
          <span className="sr-only">Loading…</span>
        </>
      )}
      <span className="btn__label">{label}</span>
    </button>
  );
}
