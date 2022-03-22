import {ChildProcess} from "./ChildProcess/ChildProcess";

const timeout = (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 60000)
    })
}

const run = async () => {
    try {

        const now = new Date().toLocaleTimeString();
        console.log(`begin build ${now}`)
        await ChildProcess.exec(`yarn start`);
        console.log(`finish build ${now}`)
        await ChildProcess.exec(`git add -A && git commit -m "new build ${now}" && git push`);
        console.log(`begin timeout ${now}`)
        await timeout()
        console.log(`end timeout ${now}`)
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
