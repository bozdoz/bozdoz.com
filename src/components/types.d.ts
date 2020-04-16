/**
 * These attributes could appear within the frontmatter of markdown files
 */
interface FrontMatterAttributes {
  title: string;
  subtitle: string;
  description: string;
  show_description: boolean;
  link: string;
  tags: string[];
  image: string;
  status: number;
}

interface FrontMatterObject {
  body: string;
  attributes: FrontMatterAttributes;
}
