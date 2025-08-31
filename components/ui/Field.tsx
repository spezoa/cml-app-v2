
import * as React from "react";

/** Utility to join class names */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Base classes for inputs to match the new UI */
const baseControl =
  "w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500";

/** FIELD CONTAINER (label + control + hint/error) */
export interface FieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  const describedById = React.useId();
  const errorId = `${describedById}-error`;
  const hintId = `${describedById}-hint`;

  return (
    <div className={cx("space-y-1.5", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          {label}{" "}
          {required ? (
            <span
              aria-hidden
              className="text-red-600 dark:text-red-400 font-semibold"
              title="Requerido"
            >
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-invalid={error ? true : undefined}
      >
        {children}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** INPUT */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cx(
        baseControl,
        invalid && "border-red-500 focus:ring-red-500",
        className
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
);
Input.displayName = "Input";

/** TEXTAREA */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cx(
        baseControl,
        "min-h-[100px]",
        invalid && "border-red-500 focus:ring-red-500",
        className
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

/** SELECT */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cx(
        baseControl,
        "pr-8",
        invalid && "border-red-500 focus:ring-red-500",
        className
      )}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

/** LABELED: syntactic sugar -> <Labeled label="..." htmlFor="id"><Input id="id" .../></Labeled> */
export interface LabeledProps
  extends Omit<FieldProps, "children"> {
  children: React.ReactNode;
}

export function Labeled({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: LabeledProps) {
  return (
    <Field
      label={label}
      htmlFor={htmlFor}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {children}
    </Field>
  );
}

/** Default export for backward compatibility */
export default Field;

/** Re-exports of types */
export type { FieldProps as IFieldProps };
