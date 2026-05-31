
import * as fs from "fs";
import * as dotenv from "dotenv";



interface TimeOuts {

DefaultTimeout: number;

twosecTimeOut: number;

threesecTimeOut: number;

sevensecTimeOut: number;

tenSecTimeOut: number;

twentySecTimeOut: number;

}

interface Urls {
basePath: string;


homePagePath: string;

loginPagePath: string;

goooglePagePath: string;

mailinatorLink: string;

 yopmailLink: string;





 }



const Environment = process.env.ENVIRONMENT ||"QA";
const REGION = process.env.REGION ||"IN";
const envFile=`./environment/${Environment}/.env.${REGION}`;


if(fs.existsSync(envFile)){
    dotenv.config({ path: envFile });
} else {
    dotenv.config();
}

const timeOuts: TimeOuts = {
    DefaultTimeout: 30000,
    twosecTimeOut: 2000,
    threesecTimeOut: 3000,
    sevensecTimeOut: 7000,
    tenSecTimeOut: 10000,
    twentySecTimeOut: 20000,
}

const urls: Urls = {
    basePath: process.env.BASE_URL!,
    homePagePath: process.env.HOME_PAGE_PATH!,
    loginPagePath: process.env.LOGIN_PAGE_PATH!,
    goooglePagePath: process.env.GOOGLE_PAGE_PATH!,
    mailinatorLink: process.env.MAILINATOR_LINK !,
    yopmailLink: process.env.YOPMAIL_LINK! ,
}

export{ urls,timeOuts}