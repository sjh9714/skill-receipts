// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import baseSlugify from "slugify";

export interface SlugifyOptions {
  separator?: string;
  maxLength?: number;
  transliterate?: boolean;
}

export const DEFAULT_SEPARATOR = "-";

export function slugify(text: string, options: SlugifyOptions = {}): string {
  const folded = text.normalize("NFKD").replace(/[̀-ͯ]/g, "");
  const slug = baseSlugify(folded, { lower: true, replacement: options.separator ?? DEFAULT_SEPARATOR });
  return options.maxLength ? slug.slice(0, options.maxLength) : slug;
}
