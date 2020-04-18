/**
 * These attributes could appear within the frontmatter of markdown files
 */
interface FrontMatterAttributes {
  title: string;
  subtitle?: React.ReactChild;
  description: string;
  show_description: boolean;
  link?: string;
  tags?: string[];
  image?: string;
  status: number;
  /** YMD */
  published_date?: string;
  /** YMD */
  modified_date?: string;
}

interface FrontMatterObject {
  body?: string;
  attributes: FrontMatterAttributes;
}

type UnwrapPromise<T> = T extends Promise<infer K> ? K : T;
