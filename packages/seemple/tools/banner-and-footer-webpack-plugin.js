const ConcatSource = require('webpack-core/lib/ConcatSource');

const date = new Date().toUTCString();

const banner = `/*
    --------------------------------------------------------------
    Seemple.js v${process.env.npm_package_version} (${date})
    JavaScript Framework by Andrey Gubanov http://github.com/finom
    Released under the MIT license
    More info: https://seemple.io
    --------------------------------------------------------------
*/

`;

// a hack to make 2nd global variable
const footer = 'if(typeof Seemple === "function") this.MK = Seemple;';

class BannerAndFooterWebpackPlugin {
  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        Object.keys(compilation.assets).forEach((file) => {
          const newSource = new ConcatSource(banner, compilation.assets[file], footer);
          compilation.assets[file] = newSource;
        });

        callback();
      });
    });
  }
}

module.exports = BannerAndFooterWebpackPlugin;
