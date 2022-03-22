import {ChildProcess} from "./ChildProcess/ChildProcess";

const timeout = (): Promise<void> => {
    console.log(`begin timeout ${new Date().toLocaleTimeString()}`)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 5000)
    })
}

const run = async () => {
    try {

        await timeout()
        const now = new Date().toLocaleTimeString();
        console.log(`end timeout ${now}`)
        console.log(`begin build ${now}`)
        await ChildProcess.exec(`yarn start`);
        console.log(`finish build ${now}`)
        await ChildProcess.exec(`git add -A && git commit -m "new build ${now}" && git push`);
    } catch (e) {
        console.log("error: " + e)
    }
};

const main = async () => {
    while (1 === 1) {
        await run();
    }
}

main();
