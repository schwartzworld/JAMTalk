import * as child_process from "child_process";

export class ChildProcess {
    static exec = (command: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            child_process.exec(command, (error, stdout, stderr) => {
                if (stderr) console.error(stderr);
                if (error) {
                    if (error.code === 1) {
                        // leaks present
                        resolve(stdout);
                    } else {
                        // gitleaks error
                        reject(error);
                    }
                } else {
                    // no leaks
                    resolve(stdout);
                }
            });
        })
    }
}
