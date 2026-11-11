// "2026-11-10" -> "10 November 2026" (British date order).
export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
