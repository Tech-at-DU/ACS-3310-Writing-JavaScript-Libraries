# ACS 3310 Lecture: Bundling

<small style="display:block;text-align:center">Bundling Libraries for distribution</small>

<!-- > -->
# Bundling with Webpack
This example walks through bundling your code using Rollup. 

## What is bundling? 
Bundling is the process of processing and compiling your source code into production code that is ready to publish. 

### A quick history of JS 
In the old days module did not exist and all code was global. This was a big problem, so developers came up with the "Immediately Invoked Function Expression" or IIFE. 

```JS
(function() {
  // Everything declared in this block is 
  // isoltaed to to this block. 
  var x = 100
  function hello() {

  }
})()

// The code inside the block above is not accessible
// outside of the block. 
```

This fixed some issues but created a problem when you need different blocks of code to communicate. 

Commonjs defined a module format that could be used to share data by importing and exporting that data. This is facilitated by requireJS. 

https://requirejs.org/docs/commonjs.html

The commonjs format was incorporated into NodeJS. 

https://requirejs.org/docs/node.html

All of this evolved into the Universal Module Defintion (UMD) format. 

https://github.com/umdjs/umd

UMD is a format that can be used anywhere. It works with both browser based apps and Node Based apps. The browser and Node are two different environments! 

### Ecmascript Modules
Ecmascript is the term for the standard that is used for the JavaScript language and the two can be used interchangably. You are writing Ecmascript. 

A recent addition to Ecmascript is the concept of modules. 

### What is a Module? 
Think of a module as a scope. Code written in that scope is not available outside the scope unless it is exported. Code from another module is not available unless it is imported.

In practice a module is a file. Anything you define in that file is not accessible and will not clash with anything in another module (file). Any module can declare exports for things it wants to share with other modules, and import things it wants to use from other modules. 

## Why bundle? 
Older borwsers don't support the newer ESM (Ecmascript Modules) the process of bundling converts code you write with newer syntax into code that will work in older browsers, it will also make code compatible with RequireJS and Node. 

Besides creating versions of your code that are compatible with various module systems ESM, CommonJS, and UMD, it also performs other tasks like converting TypeScript to JavaScript. 

## What is Rollup? 
Rollup is a JavaScript bundler. You'll use it to combine seperate JS files into a single file, convert TypeScript to JS, and form that code into modules that conform to one or more of the module formats like ESM, UMD, or AMD. 

Rollup also performs Tree Shaking, which is process of eliminating code that is not used. 

## Getting Started
Following the steps below you will:
 
- Install and configure Rollup to do the following: 
  - Compile your type script
  - Create ESM 
  - Create UMD
- Add a .npmignore to remove extra files from your npm package
- Configure TypeScript

## Install dependencies

```bash
npm install --save-dev rollup rollup-plugin-typescript2 typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs
```
## TypeScript Config
Create tsconfig.json

Add:
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "declaration": true,
    "declarationDir": "dist/types",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Rollup config
Create rollup.config.js

Add 
```js
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts', // Entry point
  output: [
    {
      file: 'dist/bundle.umd.js',
      format: 'umd', // Universal Module Definition
      name: 'MyLibrary', // Global name in UMD builds
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es', // ESM format
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(), // To resolve node_modules
    commonjs(), // To convert CommonJS modules to ES6
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true, // Output .d.ts files to the specified folder
    }),
  ]
};
```

## Package.json options
Edit package.json

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "main": "dist/bundle.umd.js",
  "module": "dist/bundle.esm.js",
  "types": "dist/types/index.d.ts",
  "type": "module",
  "scripts": {
    "build": "rollup -c",
    "watch": "rollup -c -w"
  }
}
```

## Using the bundler
Use one of the two commands below to run the bundling process. This should compile your TypeScript code into JS, creating `bundle.esm.js`, and `bundle.umd.js`, along with source maps for each. 

Building your code when you are ready to publish. 

```bash
npm run build
```

Or, watch your code and compile when files are edited and saved. 

```bash
npm run watch
```

## What is a source map? 
Take a look at the output, in the dist folder, you'll see files `bundle.esm.js` and `bundle.esm.js.map`. The second file is a source map. 

Source maps are files that map your minified or compiled code (like from TypeScript or a bundler) back to the original source code. They allow developers to debug and trace errors in the original code, even if the code has been transformed. 

When using source maps, you can see the original TypeScript or ES6+ code in developer tools, making it easier to troubleshoot issues without having to deal with the compiled output.

## Defining what is published to npm
You might not want to publish all of the files in your project to the npm registry.  

Edit your `package.json`:

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "main": "dist/index.js",
  "files": [
    "dist/",       // Include the built output
    "README.md",   // Include documentation if necessary
    "LICENSE"      // Include license file
  ],
  ...
}
```

Only wat is listed under the "files" key should be uploaded to the package registry. Make sure you include everything that is needed without getting extra files that were used only for development. 

## Review the bundling setup
The following describes what is happening in the bundling setup described here. 

### 1. **TypeScript Compilation:**
   TypeScript is being compiled based on your `tsconfig.json` configuration, which specifies important options like:
   - `target: "es5"`: This ensures compatibility with older JavaScript environments.
   - `module: "esnext"`: Tells TypeScript to leave ES module imports and exports as they are.
   - `declaration: true`: Generates `.d.ts` files (type declarations) for consumers of your library.
   - `outDir: "dist"`: Specifies the output directory for compiled files.
   - `strict: true`: Enables TypeScript's strict type-checking.

### 2. **Rollup Bundling:**
   Rollup is a module bundler that is responsible for creating the final UMD and ESM bundles of your library. Here's what happens in `rollup.config.js`:
   
   - **Input**: The entry file (`src/index.ts`) is the starting point of your library.
   - **Output**: 
     - **UMD Format (`dist/bundle.umd.js`)**: UMD (Universal Module Definition) works across multiple environments—browser, Node.js, or AMD. This is useful for making your library flexible in how it's consumed.
     - **ESM Format (`dist/bundle.esm.js`)**: ESM (ECMAScript Module) is the modern JavaScript module format, ideal for tree-shaking and usage in modern environments like web applications or other modules.
   - **Sourcemap**: This option enables sourcemaps, allowing developers to debug your library more easily by mapping the compiled code back to the original TypeScript source.
   
### 3. **Plugins:**
   - **`@rollup/plugin-node-resolve`**: This allows Rollup to find and bundle dependencies from `node_modules` if needed.
   - **`@rollup/plugin-commonjs`**: Converts CommonJS modules (used in many npm packages) to ES6, so Rollup can include them in the bundle.
   - **`rollup-plugin-typescript2`**: This handles the TypeScript compilation, integrates it with Rollup, and ensures that `.d.ts` files (TypeScript type definitions) are generated as per your `tsconfig.json`.

### 4. **UMD and ESM Outputs:**
   - **UMD (Universal Module Definition)**: The `umd` format is designed to work in different environments—browser (global variable), Node.js (CommonJS), and AMD. This makes your library versatile and usable in various settings.
   - **ESM (ECMAScript Module)**: The `es` format outputs an ES module that is useful for modern JavaScript environments. ESM supports tree-shaking, meaning unused code can be excluded when bundled by the consumer of your library.

### 5. **`type: "module"` in `package.json`:**
   Adding `"type": "module"` in `package.json` tells Node.js that your package should be treated as an ESM package. This ensures that when your library is used in environments like Node.js, ESM syntax (import/export) is handled correctly.

### 6. **Build Script:**
   The `"build": "rollup -c"` script runs Rollup with the configuration from `rollup.config.js`, bundling your TypeScript source code into both UMD and ESM formats.

### Summary:
- TypeScript compiles your code into JavaScript.
- Rollup bundles it into different module formats (UMD for wide compatibility and ESM for modern environments).
- Type declaration files are generated for TypeScript consumers.
- Sourcemaps are included for debugging.
- The `"type": "module"` in `package.json` ensures correct behavior in Node.js environments using ES modules.

## Stretch Challenges! 
Try applying the dieas below to extend the work above. 

### 1. **Customize File Names (Output)**
You can use placeholders in Rollup's `output.file` option to dynamically adjust filenames based on the format or environment (development/production).

In `rollup.config.js`, you could change the output filenames like this:
```javascript
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/my-library.umd.js', // Custom UMD file name
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true,
    },
    {
      file: 'dist/my-library.esm.js', // Custom ESM file name
      format: 'es',
      sourcemap: true,
    }
  ],
  // Plugins remain unchanged
};
```

You can also dynamically set file names using the `NODE_ENV` environment variable:
```javascript
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: production ? 'dist/my-library.min.js' : 'dist/my-library.js', // Different output for production
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true,
    },
    {
      file: production ? 'dist/my-library.esm.min.js' : 'dist/my-library.esm.js',
      format: 'es',
      sourcemap: true,
    }
  ],
  // Plugins remain unchanged
};
```



### 2. **Minify Production Code**
To minify your code for production, you can use the **Terser** plugin. It compresses and minifies the bundled code, making it more suitable for production.

1. Install Terser:
   ```bash
   npm install --save-dev rollup-plugin-terser
   ```

2. Use it in your Rollup config:
   ```javascript
   import typescript from 'rollup-plugin-typescript2';
   import resolve from '@rollup/plugin-node-resolve';
   import commonjs from '@rollup/plugin-commonjs';
   import { terser } from 'rollup-plugin-terser'; // Import the terser plugin

   const production = !process.env.ROLLUP_WATCH;

   export default {
     input: 'src/index.ts',
     output: [
       {
         file: production ? 'dist/my-library.umd.min.js' : 'dist/my-library.umd.js',
         format: 'umd',
         name: 'MyLibrary',
         sourcemap: true,
       },
       {
         file: production ? 'dist/my-library.esm.min.js' : 'dist/my-library.esm.js',
         format: 'es',
         sourcemap: true,
       }
     ],
     plugins: [
       resolve(),
       commonjs(),
       typescript({
         tsconfig: './tsconfig.json',
       }),
       production && terser() // Minify only if it's production
     ]
   };
   ```

### Rollup config notes

When I was done this is what I had in my `rollup.config.js`. 

```JS
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts', // Entry point
  output: [
    {
      file: 'dist/bundle.umd.js',
      format: 'umd', // Universal Module Definition
      name: 'stringlib', // Global name in UMD builds
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es', // ESM format
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(), // To resolve node_modules
    commonjs(), // To convert CommonJS modules to ES6
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true, // Output .d.ts files to the specified folder
    }),
  ]
};
```

Notice I changed the names of the ouptu files to: `dist/bundle.umd.js` and `dist/bundle.esm.js`. I also changed the name of the Global var to `stringlib`. 

With these changes I needed to make a couple changes to `package.json`. 

```JSON
  ...
  "main": "dist/bundle.umd.js",
  "module": "dist/bundle.esm.js",
  "exports": {
    ".": {
      "require": "./dist/bundle.umd.js",
      "import": "./dist/bundle.esm.js"
    }
  },
  "types": "dist/types/index.d.ts",
  "type": "module",
  ...
```

This identifies the main file as `dist/bunlde.umd.js` and the ES Module as `dist/bundle.esm.js`. The "exports" key tells node where to find the correct files when using `import from` or `require()`. 

### 3. **Generate Separate Development and Production Bundles**
You can have separate configurations for development and production builds using the `NODE_ENV` environment variable:
1. In `rollup.config.js`:
   ```javascript
   const production = process.env.NODE_ENV === 'production';

   export default {
     input: 'src/index.ts',
     output: {
       file: production ? 'dist/my-library.min.js' : 'dist/my-library.js',
       format: 'umd',
       name: 'MyLibrary',
       sourcemap: true,
     },
     plugins: [
       resolve(),
       commonjs(),
       typescript(),
       production && terser() // Minify production build only
     ]
   };
   ```

2. Set environment variables in your build scripts in `package.json`:
   ```json
   {
     "scripts": {
       "build:dev": "NODE_ENV=development rollup -c",
       "build:prod": "NODE_ENV=production rollup -c"
     }
   }
   ```

Now, you can run:
- `npm run build:dev` for development
- `npm run build:prod` for production (with minification)

### 4. **Tree Shaking and Dead Code Elimination**
Rollup automatically performs **tree-shaking**, meaning it removes unused code from your final bundle. To ensure this works efficiently:
- Use ES module syntax (`import`/`export`) throughout your codebase.
- Avoid side effects in your modules.

To improve this further, you can add specific configuration in the output to ensure better dead code elimination:
```javascript
output: {
  file: production ? 'dist/my-library.min.js' : 'dist/my-library.js',
  format: 'umd',
  name: 'MyLibrary',
  sourcemap: true,
  treeshake: true, // Explicitly enable tree-shaking
},
```

### Summary of Extensions:
- **Customize File Names**: Use dynamic names based on the environment or format.
- **Minify Code**: Use `rollup-plugin-terser` to minify production builds.
- **Separate Dev and Prod Builds**: Use environment variables to generate different builds.
- **Tree Shaking**: Rollup removes unused code automatically for efficient bundles.
