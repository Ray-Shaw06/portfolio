import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Build-time only. The pages are statically exported, so marked never reaches
 * the browser and the essays cost the reader no JavaScript.
 */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
