// Rules: BTN-001 BTN-002 BTN-003 BTN-004
// State coverage: default, hover, focus, active, disabled, loading (per canonical/states/button.md)
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    chromatic: { pauseAnimationAtEnd: true },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    label: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ── Default state ─────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { variant: 'primary', size: 'md' },
};

export const DefaultSecondary: Story = {
  args: { variant: 'secondary', size: 'md' },
};

export const DefaultGhost: Story = {
  args: { variant: 'ghost', size: 'md' },
};

/* ── Hover state ────────────────────────────────────────────────────────── */
export const Hover: Story = {
  args: { variant: 'primary', size: 'md' },
  parameters: { pseudo: { hover: true } },
};

export const HoverSecondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  parameters: { pseudo: { hover: true } },
};

/* ── Focus state ────────────────────────────────────────────────────────── */
export const Focus: Story = {
  args: { variant: 'primary', size: 'md' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    button.focus();
  },
};

/* ── Active state ───────────────────────────────────────────────────────── */
export const Active: Story = {
  args: { variant: 'primary', size: 'md' },
  parameters: { pseudo: { active: true } },
};

/* ── Disabled state ─────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
};

export const DisabledSecondary: Story = {
  args: { variant: 'secondary', size: 'md', disabled: true },
};

/* ── Loading state ──────────────────────────────────────────────────────── */
export const Loading: Story = {
  args: { variant: 'primary', size: 'md', loading: true },
};

export const LoadingSecondary: Story = {
  args: { variant: 'secondary', size: 'md', loading: true },
};

/* ── Size variants ──────────────────────────────────────────────────────── */
export const SizeSmall: Story = {
  args: { variant: 'primary', size: 'sm' },
};

export const SizeLarge: Story = {
  args: { variant: 'primary', size: 'lg' },
};
