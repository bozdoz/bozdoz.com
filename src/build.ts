console.log('building');

// run sass
export const resass = () =>
  Bun.$`bunx sass ./src/css/style.scss ./dist/client.css --no-source-map`
    .then(() => console.log('created ./dist/client.css'))
    .catch((e) => console.error(e));

resass();

// build client
export const build = () =>
  Bun.build({
    entrypoints: ['./src/client.tsx'],
    outdir: './dist',
  });

build();
