import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js';

let fuse;

export const initializeFuse = (data) => {
  fuse = new Fuse(data, {
    keys: ['title', 'content', 'category'],
    threshold: 0.3,
  });
};

export const search = (query) => {
  if (!query) return fuse.getIndex().docs;
  return fuse.search(query).map(result => result.item);
};

