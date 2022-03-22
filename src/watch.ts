import {ChildProcess} from "./ChildProcess/ChildProcess";


const run = async () => {
    try {

        const now = new Date().toLocaleTimeString();
        console.log(`begin build ${now}`)
        await ChildProcess.exec(`yarn start`);
        console.log(`finish build ${now}`)
        await ChildProcess.exec(`git add -A && git commit -m "new build ${now}" git push`);
    } catch (e) {
        console.log("error: " + e)
    }
};
run().then(() => console.log('done'))
