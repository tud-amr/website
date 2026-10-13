// Eleventy configuration for autonomousrobots.nl.
// Content lives in content/, templates in src/, static files in assets/.
// See README.md for how the pieces fit together.

export default function (eleventyConfig) {
  // Liquid set up to behave like Jekyll's, so existing content keeps working:
  // `{% include fix_link.html link='...' %}` with unquoted file names and `include.*` parameters.
  eleventyConfig.setLiquidOptions({
    jekyllInclude: true,
    dynamicPartials: false,
  });

  // Static files are copied as they are; their URLs never change.
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ "content/CNAME": "CNAME" });

  return {
    dir: {
      input: "content",
      includes: "../src/_includes",
      layouts: "../src/_layouts",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
