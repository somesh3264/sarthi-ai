export const inputBase =
  "mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-azure/30";

export function inputClass(hasError) {
  return `${inputBase} ${hasError ? "border-red-700" : "border-grey-dark/20"}`;
}

// Props to wire an input to its hint / error text for screen readers.
export function fieldA11y(id, errors, { hint = false, required = false } = {}) {
  return {
    id,
    name: id,
    "aria-invalid": !!errors[id],
    "aria-describedby": errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined,
    ...(required ? { "aria-required": "true" } : {}),
  };
}
