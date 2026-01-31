/**
 * These attributes could appear within the frontmatter of markdown files
 */
interface FrontMatterAttributes {
  title: string;
  header?: string;
  description?: string;
  show_description?: boolean;
  // 404?
  status?: number;
  subtitle?: React.ReactChild;
  link?: string;
  tags?: string[];
  image?: string;
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
