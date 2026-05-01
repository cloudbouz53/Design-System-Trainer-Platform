// Rules: INP-001 INP-002 TOK-001 TOK-002 TOK-003
import React, { useId } from 'react';
import './Input.css';

export type InputState = 'default' | 'error' | 'success';

export interface InputProps {
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  state?: InputState;
  errorMessage?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
}

export function Input({
  label,
  value,
  placeholder,
  disabled = false,
  state = 'default',
  errorMessage,
  helperText,
  onChange,
  type = 'text',
}: InputProps) {
  const generatedId = useId();
  const inputId = `input-${generatedId}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const hasError = state === 'error' && errorMessage;
  const hasHelper = !hasError && helperText;

  const describedBy = [
    hasError ? errorId : null,
    hasHelper ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={`input-wrapper input-wrapper--${state}${disabled ? ' input-wrapper--disabled' : ''}`}>
      {/* INP-001: always has an associated label */}
      <label htmlFor={inputId} className="input__label">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className="input__field"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {/* INP-002: error message with aria-describedby reference and role="alert" */}
      {hasError && (
        <span id={errorId} className="input__error" role="alert">
          {errorMessage}
        </span>
      )}
      {hasHelper && (
        <span id={helperId} className="input__helper">
          {helperText}
        </span>
      )}
    </div>
  );
}
