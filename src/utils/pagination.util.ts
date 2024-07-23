/**
 *
 * @param page
 * @param perPage
 * @param pages
 *
 * @returns
 */
export const paginate = (
  page = 1,
  perPage = 10,
  pages: number
): { current: number; prev: number | null; next: number | null; pages: number } => {
  const sumOfPages = Math.ceil(pages / perPage);
  return {
    current: page ?? 1,
    prev: page > 1 ? page - 1 : null,
    next: page < sumOfPages ? page + 1 : null,
    pages: sumOfPages,
  };
};
