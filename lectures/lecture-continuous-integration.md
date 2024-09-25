# What is Continuous Integration (CI)?
Continuous Integration (CI) is a practice in software development where code changes are automatically tested and validated each time they are pushed to a shared repository. The goal of CI is to catch issues early by regularly integrating changes into the main codebase and running automated tests to ensure everything is working as expected.

## Benefits of CI
- **Early detection of bugs**: By frequently testing code with automated tests, CI helps developers find and fix bugs before they become bigger problems.
- **Consistent code quality**: CI enforces a process that checks for issues every time code is committed, ensuring quality and reliability.
- **Automated workflows**: CI systems can automate tasks like running tests, building your project, or even deploying code.

## GitHub Actions for CI
GitHub Actions is GitHub’s CI/CD platform that allows you to automate workflows directly in your GitHub repositories. You define workflows using YAML files, and these workflows can automate a wide range of tasks, like running tests or building your code, triggered by events such as pushes, pull requests, or on a schedule.

## CI Workflow Example using GitHub Actions
Below is the `ci.yml` file we created, which automates the CI process for an npm package using TypeScript, Rollup, and Jest.

```yaml
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x]  # Specify Node.js versions to test

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build package with Rollup
        run: npm run build  # This generates the dist folder

      - name: Run tests
        run: npm test  # Jest tests will be executed

      - name: Upload test coverage report
        if: success()
        uses: actions/upload-artifact@v3
        with:
          name: coverage
          path: coverage
```

### How This Workflow Works:

1. **Triggers (`on`)**:  
   The workflow is triggered every time code is pushed to the `main` branch, or when a pull request targeting the `main` branch is opened. This ensures that all code changes are tested before being merged.

2. **Jobs**:  
   The workflow contains a job named `build`. This job is run on `ubuntu-latest`, a cloud environment provided by GitHub.

3. **Matrix Strategy**:  
   The `matrix` is used to run the job on multiple Node.js versions (16.x and 18.x). This ensures your code works across different environments.

4. **Steps**:  
   Each job consists of multiple steps that define the tasks to be executed:
   - **Checkout Repository**: This step clones the current version of your codebase into the runner’s environment.
   - **Set up Node.js**: Installs Node.js and caches dependencies for faster builds in the future.
   - **Install Dependencies**: Installs all the npm dependencies from the `package.json` file.
   - **Build the Package**: Runs the Rollup build command, generating the output in the `dist` folder.
   - **Run Tests**: Executes tests using Jest.
   - **Upload Coverage Report**: If the tests pass, the workflow uploads the test coverage report for analysis.

## Conclusion
GitHub Actions makes it easy to integrate CI into your projects by automating tasks such as testing and building your code. By using a workflow like the one above, you can ensure that each code change is tested in multiple environments, helping to maintain a high-quality codebase.

CI workflows also give you immediate feedback on whether your code works, preventing broken code from being merged into the main project and giving your team confidence in every change.
