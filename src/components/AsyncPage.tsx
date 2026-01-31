import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout, { PageLayoutProps } from './layouts/PageLayout';
import { getPage } from './getPage';
import { useContext, useEffect, useMemo, useState } from 'react';
import LoadingPage from './pages/LoadingPage';
import InitialHTMLContext from './InitialHTMLContext';

export interface AsyncPageProps {
  // tell me where to get the markdown file
  source: string;
  title?: string;
  page?: FrontMatterObject;
  className?: string;
  breadcrumbs?: PageLayoutProps['breadcrumbs'];
  children?: React.ReactNode;
}

const AsyncPage = (props: AsyncPageProps) => {
  const controller = useMemo(() => {
    return new AbortController();
  }, []);
  // fetch markdown
  // TODO: get markdown from initial HTML passed by server
  const initialHTML = useContext(InitialHTMLContext);
  const isInitialPage = initialHTML.source === props.source;
  const [page, setPage] = useState<FrontMatterObject | null>(
    isInitialPage ? initialHTML : null,
  );

  useEffect(() => {
    if (!isInitialPage) {
      getPage(props.source, controller.signal).then(setPage);
    }
  }, [isInitialPage, props.source]);

  if (page == null) {
    return <LoadingPage />;
  }

  const { body, attributes } = page;

  const { link, description, show_description, tags } = attributes;

  let subtitle = attributes.subtitle;

  if (link && subtitle) {
    subtitle = (
      <a target="_blank" href={link} rel="noreferrer">
        {subtitle}
      </a>
    );
  }

  return (
    <PageLayout {...attributes} subtitle={subtitle} {...props}>
      {description && show_description && (
        <div className="page-description">
          <p>{description}</p>
        </div>
      )}
      {tags && <TagList tags={tags} />}
      {body && <MarkDown content={body} />}
      {props.children}
    </PageLayout>
  );
};

export default AsyncPage;
