// The metrics page exists only when its secret path and the numbers are available.
export default {
  eleventyComputed: {
    permalink: (data) => (data.stats && data.stats.path ? `/${data.stats.path}/` : false),
  },
};
