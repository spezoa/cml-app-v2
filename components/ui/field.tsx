"use client";
import * as React from 'react';

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

type BaseDivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
export default function Field({ className, ...props }: BaseDivProps) {
  return <div className={cx('space-y-2', className)} {...props} />;
}

type Common = { label?: string; hint?: React.ReactNode; className?: string };

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & Common & { id?: string };
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, id, className, ...props },
  ref
) {
  const uid = React.useId();
  const inputId = id ?? uid;
  return (
    <Labeled label={label} hint={hint} htmlFor={inputId} className={className}>
      <input
        id={inputId}
        ref={ref}
        className={cx(
          'w-full rounded-lg px-3 py-2 border',
          'bg-white text-gray-900 border-gray-300',
          'dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
        )}
        {...props}
      />
    </Labeled>
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & Common & { id?: string };
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, id, className, children, ...props },
  ref
) {
  const uid = React.useId();
  const selectId = id ?? uid;
  return (
    <Labeled label={label} hint={hint} htmlFor={selectId} className={className}>
      <select
        id={selectId}
        ref={ref}
        className={cx(
          'w-full rounded-lg px-3 py-2 border',
          'bg-white text-gray-900 border-gray-300',
          'dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
        )}
        {...props}
      >
        {children}
      </select>
    </Labeled>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & Common & { id?: string };
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, id, className, ...props },
  ref
) {
  const uid = React.useId();
  const textareaId = id ?? uid;
  return (
    <Labeled label={label} hint={hint} htmlFor={textareaId} className={className}>
      <textarea
        id={textareaId}
        ref={ref}
        className={cx(
          'w-full rounded-lg px-3 py-2 border',
          'bg-white text-gray-900 border-gray-300',
          'dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
        )}
        {...props}
      />
    </Labeled>
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
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p> : null}
    </div>
  );
}