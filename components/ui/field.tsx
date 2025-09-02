'use client';

import * as React from 'react';

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

type BaseDivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
export default function Field({ className, ...props }: BaseDivProps) {
  return <div className={cx('space-y-2', className)} {...props} />;
}

type Common = { label?: string; hint?: React.ReactNode; className?: string };

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & Common;
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, id: givenId, className, ...props },
  ref
) {
  const reactId = React.useId();
  const id = givenId ?? reactId;

  return (
    <div className={cx('space-y-1.5', className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        ref={ref}
        className={cx(
          'w-full rounded-md border bg-background px-3 py-2 text-sm',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring',
        )}
        {...props}
      />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
});

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & Common;
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, id: givenId, className, ...props },
  ref
) {
  const reactId = React.useId();
  const id = givenId ?? reactId;

  return (
    <div className={cx('space-y-1.5', className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        ref={ref}
        className={cx(
          'w-full rounded-md border bg-background px-3 py-2 text-sm',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring',
        )}
        {...props}
      />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
});

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & Common;
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, id: givenId, className, children, ...props },
  ref
) {
  const reactId = React.useId();
  const id = givenId ?? reactId;

  return (
    <div className={cx('space-y-1.5', className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        ref={ref}
        className={cx(
          'w-full rounded-md border bg-background px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-ring',
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
});

type LabeledProps = {
  label?: string;
  hint?: React.ReactNode;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
};
export function Labeled({ label, hint, htmlFor, children, className }: LabeledProps) {
  return (
    <div className={cx('space-y-1.5', className)}>
      {label ? (
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}