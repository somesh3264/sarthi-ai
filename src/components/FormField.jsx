export function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-grey-dark/85">
        {label}
        {required && (
          <span className="text-red-700" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-grey-dark/60">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function Fieldset({ legend, children }) {
  return (
    <fieldset className="rounded-2xl border border-grey-dark/10 p-5 sm:p-6">
      <legend className="px-2 font-heading text-base font-semibold text-navy">{legend}</legend>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
