export interface Fact {
  label: string;
  value: string;
  /** Must trace to a row in the spec's facts table. Never fabricate. */
  source: string;
}

export interface ProjectLink {
  label: string;
  href?: string;
  /** Used when there is deliberately no public link, e.g. client work. */
  note?: string;
}

export interface Project {
  slug: string;
  name: string;
  kind: "paid" | "product" | "client";
  status: string;
  /** Field 2: what it is, one sentence. */
  oneLine: string;
  /** Field 4: what made it non-trivial. */
  constraint: string;
  /** Field 5: the technical centre. */
  hardPart: string;
  /** Field 6: the judgement call. */
  decision: string;
  /** Field 7: the tradeoff accepted, stated plainly. */
  cost: string;
  stack: string[];
  facts: Fact[];
  links: ProjectLink[];
  heroShot?: string;
  /** Intrinsic pixel size, so the slot is reserved before the image loads. */
  heroShotSize?: [number, number];
  heroCaption?: string;
  essaySlugs?: string[];
  cardBlurb: string;
  /** Dynamo is false: it has its own home page section instead. */
  showAsCard: boolean;
}

export interface Essay {
  slug: string;
  title: string;
  date: string;
  argues: string;
  pullQuote: string;
}
