import * as fs from "fs";

export class FS {
    static readdir = (path: string): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err)
                    reject(err);
                else {
                    resolve(files)
                }
            })
        })
    }
}
