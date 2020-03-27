import * as path from 'path';
import axios from 'axios';

interface FrontMatterAttributes {
  link: string;
  description: string;
  show_description: boolean;
  tags: string[];
  subtitle: string;
}

export interface FrontMatterObject {
  body: string;
  attributes: FrontMatterAttributes;
}

export const cache: Record<string, FrontMatterObject> = {};

/**
 * Gets markdown formatted page content from server
 *
 * @param string page
 * @param object req 	created by axios.CancelToken.source()
 * @return Promise
 */
export const getPage = (page: string, req: any): Promise<FrontMatterObject> => {
  return new Promise(resolve => {
    if (cache[page]) {
      resolve(cache[page]);
    } else {
      axios
        .get(path.join('/', 'pages', `${page}`), {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          cancelToken: req.token
        })
        .then((request: any) => request.data)
        .then((data: FrontMatterObject) => {
          cache[page] = data;
          resolve(data);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  });
};
