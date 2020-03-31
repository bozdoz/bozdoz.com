import * as path from 'path';
import axios from 'axios';

export const cache: Record<string, FrontMatterObject> = {};

/**
 * Gets markdown formatted page content from server
 */
export const getPage = async (
  page: string,
  { token }: ReturnType<typeof axios['CancelToken']['source']>
): Promise<FrontMatterObject | null> => {
  if (cache[page]) {
    return cache[page];
  }

  try {
    const { data } = await axios.get<FrontMatterObject>(
      path.join('/', 'pages', `${page}`),
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        cancelToken: token
      }
    );

    cache[page] = data;

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
