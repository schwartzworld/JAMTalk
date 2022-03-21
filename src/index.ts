import Email from "./Email/Email";
import {PageBuilder} from "./PageBuilder/PageBuilder";

const main = async () => {
    const newPostTitles = await Email.fetch();
    const x = await PageBuilder.buildNew(newPostTitles)

}

main().then(() => console.log("All doneskies. " + new Date().toLocaleTimeString()));
