'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const ngFsUtils = require('@angular/compiler-cli/src/ngtsc/file_system');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');

const inlineResources = require('./inline-resources');


const libName = require('./package.json').name;
const rootFolder = path.join(__dirname);
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src/lib');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'lib-es5');
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015');

const rollupInputBase = {
  external: [
    // List of dependencies
    // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
    '@angular/common',
    '@angular/core',
    '@angular/forms'
  ],
  plugins: [
    sourcemaps()
  ]
};

const rollupOutputBase = {
  name: camelCase(libName),
  sourceMap: true,
  // ATTENTION:
  // Add any dependency or peer dependency your library to `globals` and `external`.
  // This is required for UMD bundle users.
  globals: {
    // The key here is library name, and the value is the the name of the global variable name
    // the window object.
    // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
  },
};

return Promise.resolve()
// Copy library to temporary folder and inline html/css
  .then(() => _relativeCopy(`**/*`, srcFolder, tempLibFolder)
  .then(() => inlineResources(tempLibFolder))
.then(() => console.log('Inlining succeeded.'))
)
// Compile to ES2015.
.then(() => {
  ngFsUtils.setFileSystem(new ngFsUtils.NodeJSFileSystem());
  ngc(['-p', `${tempLibFolder}/tsconfig.lib.json`], (error) => {
  if (error) {
    throw new Error('ngc ES2015 compilation failed: ' + error);
  }
})
}
)
.then(() => console.log('ES2015 compilation succeeded.'))

// Compile to ES5.
.then(() => ngc(['-p', `${tempLibFolder}/tsconfig.es5.json`], (error) => {
      if (error) {
        throw new Error('ngc ES5 compilation failed: ' + error);
      }
    })
  )
.then(() => console.log('ES5 compilation succeeded.'))
// Copy typings and metadata to `dist/` folder.
.then(() => Promise.resolve()
  .then(() => _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder))
.then(() => console.log('Typings and metadata copy succeeded.'))
)
// Bundle lib.
.then(() => {
  // Base configuration.
  const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
  const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);

  // UMD bundle.
  const umdInConfig = Object.assign({}, rollupInputBase, {
    input: es5Entry
  });
  const umdOutConfig = Object.assign({}, rollupOutputBase, {
    file: path.join(distFolder, `bundles`, `${libName}.umd.js`),
    format: 'umd'
  });

  // Minified UMD bundle.
  const minifiedUmdInConfig = Object.assign({}, rollupInputBase, {
    input: es5Entry,
    plugins: rollupInputBase.plugins.concat([uglify({})])
  });
  const minifiedUmdOutConfig = Object.assign({}, rollupOutputBase, {
    file: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
    format: 'umd'
  });

  // ESM+ES5 flat module bundle.
  const fesm5InConfig = Object.assign({}, rollupInputBase, {
    input: es5Entry
  });
  const fesm5OutConfig = Object.assign({}, rollupOutputBase, {
    file: path.join(distFolder, `${libName}.es5.js`),
    format: 'es'
  });

  // ESM+ES2015 flat module bundle.
  const fesm2015InConfig = Object.assign({}, rollupInputBase, {
    input: es2015Entry
  });
  const fesm2015outConfig = Object.assign({}, rollupOutputBase, {
    file: path.join(distFolder, `${libName}.js`),
    format: 'es'
  });

  let allBundlesConf = [
    {in: umdInConfig, out: umdOutConfig},
    {in: minifiedUmdInConfig, out: minifiedUmdOutConfig},
    {in: fesm5InConfig, out: fesm5OutConfig},
    {in: fesm2015InConfig, out: fesm2015outConfig}

  ].map(cfg => {

    console.log(`Creating rollUp bundle ${cfg.in.input} ...`);
    return Promise.resolve(
      rollup.rollup(cfg.in).then( (bundle) => {

        console.log(`rollUp bundle ${cfg.in.input} created`);

        console.log(`Writing bundle ${cfg.out.file} (${cfg.out.format}) to disk ...`);
        return Promise.resolve(bundle.write(cfg.out))
      }
    ))
  });

  return Promise.all(allBundlesConf)
    .then(() => console.log('All bundles generated successfully.'))
})
// Copy package files
.then(() => Promise.resolve()
  .then(() => _relativeCopy('LICENSE', rootFolder, distFolder))
.then(() => _relativeCopy('package.json', rootFolder, distFolder))
.then(() => _relativeCopy('README.md', rootFolder, distFolder))
.then(() => console.log('Package files copy succeeded.'))
)
.catch(e => {
  console.error('\Build failed. See below for errors.\n');
console.error(e);
process.exit(1);
});

function generateBundle(rollUpInput, rollUpOutput){

  return Promise.resolve()
    .then(() =>{

    })
}


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
    if (err) reject(err);
    files.forEach(file => {
      const origin = path.join(from, file);
    const dest = path.join(to, file);
    const data = fs.readFileSync(origin, 'utf-8');
    _recursiveMkDir(path.dirname(dest));
    fs.writeFileSync(dest, data);
    resolve();
  })
  })
});
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
