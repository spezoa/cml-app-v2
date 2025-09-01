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
export function Input({ label, hint, className, id, ...rest }: InputProps) {
  const htmlFor = id ?? undefined;
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <input
        id={htmlFor}
        className={cx(
          'w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-900',
          'border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400',
          className
        )}
        {...rest}
      />
      {hint ? <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p> : null}
    </div>
  );
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & Common;
export function Select({ label, hint, className, id, children, ...rest }: SelectProps) {
  const htmlFor = id ?? undefined;
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <select
        id={htmlFor}
        className={cx(
          'w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-900',
          'border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400',
          className
        )}
        {...rest}
      >
        {children}
      </select>
      {hint ? <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p> : null}
    </div>
  );
}

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & Common;
export function Textarea({ label, hint, className, id, ...rest }: TextareaProps) {
  const htmlFor = id ?? undefined;
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <textarea
        id={htmlFor}
        className={cx(
          'w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-900',
          'border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400',
          className
        )}
        {...rest}
      />
      {hint ? <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p> : null}
    </div>
  );
}

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
      {hint ? <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p> : null}
    </div>
  );
}
