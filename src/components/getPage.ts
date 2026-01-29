import path from 'path';

export const cache: Record<string, FrontMatterObject> = {};

/**
 * Gets markdown formatted page content from server
 */
export const getPage = async (
  page: string,
  signal: AbortSignal,
): Promise<FrontMatterObject | null> => {
  if (cache[page]) {
    return cache[page];
  }

  // client rendering
  const pathname = path.join('/', 'pages', `${page}`)
  const url = globalThis.HOST ? `${HOST}${pathname}` : pathname;

  console.log('getPage', { url })

  try {
    const req = await fetch(
      url,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        signal
      }
    );

    const data = await req.json();

    cache[page] = data;

    return data;
  } catch (e) {
    // tslint:disable-next-line:no-console
    // console.error(e);

    return null;
  }
};
