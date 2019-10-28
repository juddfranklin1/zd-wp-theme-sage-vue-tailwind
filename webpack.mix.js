const mix = require("laravel-mix");
require("laravel-mix-purgecss");

// Theme config
const themeConfig = {
  themePath: "sage",
  devUrl: "example.test",
};

// Public path helper
const publicPath = path => `${mix.config.publicPath}/${path}`;

// Source path helper
const src = path => `resources/assets/${path}`;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Sage application. By default, we are compiling the Sass file
 | for your application, as well as bundling up your JS files.
 |
 */

// Public Path
mix
  .setPublicPath("./dist")
  .setResourceRoot(
    `/app/themes/${themeConfig.themePath}/${mix.config.publicPath}/`
  )
  .webpackConfig({
    output: { publicPath: mix.config.resourceRoot },
  });

// Browsersync
mix.browserSync(`${themeConfig.devUrl}`);

// Styles
mix.sass(src`styles/app.scss`, "styles");

// JavaScript
mix
  .js(src`scripts/app.js`, "scripts")
  .js(src`scripts/customizer.js`, "scripts")
  .extract();

// Assets
mix
  .copyDirectory(src`images`, publicPath`images`)
  .copyDirectory(src`fonts`, publicPath`fonts`);

// Autoload
mix.autoload({
  jquery: ["$", "window.jQuery"],
});

// Options
mix.options({
  processCssUrls: false,
  postCss: [require("tailwindcss")("./tailwind.config.js")],
});

mix.purgeCss();

// Source maps when not in production.
mix.sourceMaps(false, "source-map");

// Hash and version files in production.
if (mix.inProduction()) {
  mix.version();
}
