import {test as base,Page} from "@playwright/test"
import{LoginPage} from "../pages/loginpage";

const test= base.extend<{

    loginpage:LoginPage

}>({
    loginpage: async ({ page }, use) => {
	const oginpage = new LoginPage(page)
	await use(oginpage)
  }
})

export{test}