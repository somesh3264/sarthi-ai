import { useEffect } from "react";

// Routes whose pages set their own title and description (e.g. /newsletter/:slug).
export const DYNAMIC_ROUTE_PREFIXES = ["/newsletter/", "/projects/", "/careers/"];

export function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) setMetaDescription(description);
  }, [title, description]);
}
