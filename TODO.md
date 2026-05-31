# Pipeline & Playwright TODO

This repo uses Azure Pipelines and Playwright. Keep the following items aligned with the current setup:

1. **Confirm branch trigger**
   - Verify whether your repo default branch is `master` or `main`.
   - If it is `main`, update `azure-pipelines.yml`:
     ```yaml
     trigger:
     - main
     ```

2. **Validate Playwright report output**
   - Ensure Playwright writes JUnit XML to `test-results/results.xml`.
   - Ensure Playwright HTML report output is generated under `playwright-report`.

3. **Use npm script for tests**
   - Prefer `npm test` over `npx playwright test` in pipeline scripts for better consistency.

4. **Improve test result matching**
   - Use a broader pattern if XML files may be nested:
     ```yaml
     testResultsFiles: 'test-results/**/*.xml'
     ```

5. **Verify .gitignore rules**
   - Keep local and generated artifact folders out of Git:
     - `test-results/`
     - `playwright-report/`
     - `allure-results/`
     - `allure-report/`

6. **Run a validation pass locally**
   - Verify install and test run:
     ```bash
     npm install
     npx playwright test
     ```

7. **Check generated output**
   - Confirm the build creates:
     - `test-results/results.xml`
     - `playwright-report/index.html`
