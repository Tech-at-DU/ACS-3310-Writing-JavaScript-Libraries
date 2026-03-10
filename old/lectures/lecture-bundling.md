# Bundling Your Library

## Why Bundle?

Bundling prepares your library for publishing. It helps you:

- Combine all source code into a single file
- Convert modern JavaScript (ESM) to older formats (CommonJS, UMD)
- Optimize for size and performance

---

## Key Concepts

### Modules (CommonJS vs ESM)

- **CommonJS** (`require`, `module.exports`) is used in Node environments. It loads modules synchronously and is widely supported in older projects.
- **ESM (ES Modules)** (`import`, `export`) is the modern JavaScript module system used in browsers and supported by modern bundlers and tools.

**How this affects bundling:** When you bundle your code, you may want to output both ESM and CommonJS-compatible formats so your library can work in different environments.

🤖 **AI Prompt:** "What is the difference between CommonJS and ES Modules? When should I use each?"

---

### UMD Format

UMD (Universal Module Definition) is a format that works in browsers, CommonJS, and AMD environments. It is great for publishing libraries that should be flexible and usable in any JavaScript environment.

🤖 **AI Prompt:** "What does UMD do in a JavaScript library bundle?"

---

## Rollup: Our Bundler

We'll use **Rollup** because it's:

- Easy to configure
- Supports ESM and UMD
- Works well with TypeScript

Install it:

```bash
npm install --save-dev rollup typescript rollup-plugin-typescript2
```

Create a file: `rollup.config.js`

```js
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'MyLibrary'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [typescript()]
};
```

🤖 **AI Prompt:** "Help me write a rollup.config.js file for a TypeScript library."

---

## TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

🤖 **AI Prompt:** "Explain what each option in tsconfig.json does."

---

## package.json Keys

Make sure your `package.json` includes:

```json
{
  "main": "dist/index.js",        // UMD or CommonJS
  "module": "dist/index.esm.js",  // ESM for modern tools
  "types": "dist/index.d.ts",     // TypeScript definitions
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    }
  }
}
```

**Explanation:**

- `main` is the entry point for CommonJS consumers.
- `module` is the entry point for ESM-aware bundlers like Rollup and Webpack.
- `exports` explicitly tells consumers which files to use for import/require, giving you more control and compatibility.

🤖 **AI Prompt:** "What do main, module, and exports do in package.json?"

---

## Building Your Bundle

Run this:

```bash
npx rollup -c
```

This creates your bundled output in `dist/`.

🧪 **Reminder:** Run your tests before bundling.

```bash
npm run test
```

🤖 **AI Prompt:** "Why should I run tests before bundling my library?"

---

## Stretch Goals

- Use `terser` for minification
- Add environment-specific output using NODE\_ENV
- Output CommonJS, ESM, and UMD
- Add `"sideEffects": false` to help with tree-shaking

🤖 **AI Prompt:**

- "How do I add tree-shaking support to my bundle?"
- "What's the benefit of using terser in a Rollup build?"

---

## Summary Checklist

✅ My library is written in TypeScript\
✅ It includes unit tests\
✅ Code is bundled using Rollup\
✅ Outputs include UMD and ESM formats\
✅ `package.json` has correct fields\
✅ I’ve tested everything before publishing

---

## Final Thoughts

Bundling gets your code ready for the real world. You’re publishing clean, tested, efficient code that can be used anywhere.

Use AI as a guide throughout the process:

- Generate boilerplate configs
- Explain toolchain settings
- Help troubleshoot errors

💡 **Prompt for Publishing**:

> "How do I prepare a TypeScript library for publishing to npm using Rollup?"
