import * as React from "react";

export interface FieldProps {
  /** Label del campo */
  label?: string;
  /** id del input al que apunta el label (para accesibilidad) */
  htmlFor?: string;
  /** Marca el campo como requerido (añade asterisco y aria-required) */
  required?: boolean;
  /** Texto de ayuda bajo el campo */
  hint?: React.ReactNode;
  /** Mensaje de error bajo el campo (tiene prioridad sobre hint) */
  error?: React.ReactNode;
  /** Clases extra para el contenedor */
  className?: string;
  /** Contenido del campo (inputs, selects, etc.) */
  children: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** 
 * Field: contenedor simple para label + control + hint/error.
 * No fuerza 'use client', así que puede usarse tanto en Server como Client Components.
 */
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

      {/* Slot para el control */}
      <div
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-invalid={error ? true : undefined}
      >
        {children}
      </div>

      {/* Error o hint */}
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

export type { FieldProps as IFieldProps };

export default Field;
