export const isOutdated = (date) => Date.now() - date > 10 * 60 * 1000;
