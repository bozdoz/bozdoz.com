import { useEffect, useRef, useState } from 'react';

interface Props {
  /** already parsed markdown */
  content: string;
}

/**
 * It manipulates the HTML elements generated from markdown
 */
const MarkDown = (props: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    const host = new RegExp(`^https?://${window.location.host}`);
    const container = ref.current;

    const handleOnClick = (val: string) => setRedirect(val);

    if (!container) {
      return;
    }

    // change links to use react router
    // or open new tabs
    container.querySelectorAll('a').forEach((a) => {
      if (a.href.match(host)) {
        // add redirect handler to local links
        a.addEventListener('click', (e) => {
          e.preventDefault();
          handleOnClick((e.target as typeof a).getAttribute('href')!);
        });
      } else {
        // otherwise push to a new tab
        a.target = '_blank';
        a.rel = 'noreferrer';
      }
      // add text content to label
      if (a.textContent) {
        a.setAttribute('aria-label', a.textContent);
      }
    });

    // style codeblocks;
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }

    // add links to headers
    container.querySelectorAll('h1, h2, h3, h4, h5').forEach((header) => {
      const anchor = document.createElement('a');
      anchor.className = `header-link`;
      anchor.href = `#${header.id}`;
      anchor.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>';
      header.insertBefore(anchor, header.firstChild);
    });

    container.querySelectorAll('img').forEach((img) => {
      // copy img alt text to title
      img.title = img.alt;
      // add a class to paragraphs with images for sizing
      if (img.parentElement) {
        img.parentElement.className = 'image';
      }
    });

    // make font awesome hidden to screen readers
    container.querySelectorAll('i.fa').forEach((elem) => {
      elem.setAttribute('aria-hidden', 'true');
    });
  }, []);

  return (
    <section
      ref={ref}
      className="container markdown"
      dangerouslySetInnerHTML={{
        __html: props.content,
      }}
    />
  );
};

export default MarkDown;
