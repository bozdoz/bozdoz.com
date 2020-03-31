interface FrontMatterAttributes {
  link: string;
  description: string;
  show_description: boolean;
  tags: string[];
  subtitle: string;
}

interface FrontMatterObject {
  body: string;
  attributes: FrontMatterAttributes;
}
