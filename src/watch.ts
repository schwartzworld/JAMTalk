import {ChildProcess} from "./ChildProcess/ChildProcess";

const run = async () => {
    console.log('begin')
    await ChildProcess.exec(`yarn start`);
};

setInterval(() => {
    run().then(() => {console.log('end')})

}, 10000)
