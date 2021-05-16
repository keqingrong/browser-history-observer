export const isHashEqual = (url1: string, url2: string) =>
  new URL(url1).hash === new URL(url2).hash;

export const log = (type: string, content: any) => {
  console.log(`[${type}]`, content);
};
