export const getPageNumber = (url: string): string => {
  const pageNumber = url.split("?")[1];
  return pageNumber;
};
