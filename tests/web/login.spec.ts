
import { test } from '../../fixtures/playwright.fixtures';


test('valid loginflow', async ({ loginpage }) => {
   await loginpage.launchsite();

}); 