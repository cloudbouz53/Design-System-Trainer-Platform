// Rules: INP-001 INP-002 TOK-001 TOK-002 TOK-003
// State coverage: default, hover, focus, disabled, error, success (per canonical/states/input.md)
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    chromatic: { pauseAnimationAtEnd: true },
  },
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* ── Default state ─────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { state: 'default' },
};

/* ── Hover state ────────────────────────────────────────────────────────── */
export const Hover: Story = {
  args: { state: 'default' },
  parameters: { pseudo: { hover: true, selector: '.input__field' } },
};

/* ── Focus state ────────────────────────────────────────────────────────── */
export const Focus: Story = {
  args: { state: 'default' },
  parameters: { pseudo: { focusVisible: true, selector: '.input__field' } },
};

/* ── Disabled state ─────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: { state: 'default', disabled: true },
};

/* ── Error state ─────────────────────────────────────────────────────────── */
export const Error: Story = {
  args: {
    state: 'error',
    errorMessage: 'Please enter a valid email address.',
    value: 'not-an-email',
  },
};

/* ── Success state ──────────────────────────────────────────────────────── */
export const Success: Story = {
  args: {
    state: 'success',
    value: 'user@example.com',
  },
};

/* ── With helper text ───────────────────────────────────────────────────── */
export const WithHelperText: Story = {
  args: {
    state: 'default',
    helperText: "We'll never share your email with anyone else.",
  },
};
