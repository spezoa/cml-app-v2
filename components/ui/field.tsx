import * as React from 'react';
"use client";

import * as React from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type BaseDivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
export default function Field({ className, ...props }: BaseDivProps) {
  return <div className={cx("space-y-2", className)} {...props} />;
}

type Common = { label?: string; hint?: React.ReactNode; className?: string };

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & Common;
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, className, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="space-y-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={cx(
            "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          {...props}
        />
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & Common;
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, className, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="space-y-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </label>
        ) : null}
        <textarea
          id={inputId}
          ref={ref}
          className={cx(
            "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          {...props}
        />
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & Common;
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, className, id, children, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="space-y-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </label>
        ) : null}
        <select
          id={inputId}
          ref={ref}
          className={cx(
            "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    );
  }
);
Select.displayName = "Select";

type LabeledProps = {
  label?: string;
  hint?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
};
export function Labeled({ label, hint, htmlFor, children, className }: LabeledProps) {
  return (
    <div className={cx("space-y-1.5", className)}>
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
