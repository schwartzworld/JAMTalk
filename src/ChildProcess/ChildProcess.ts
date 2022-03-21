import * as child_process from "child_process";

export class ChildProcess {
    static exec = (command: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            child_process.exec(command, (err, stdout, stderr) => {
                if (err) {
                    reject(`exec error: ${err}`);
                }
                console.error(stderr)
                resolve(stdout);
            });
        })
    }
}
