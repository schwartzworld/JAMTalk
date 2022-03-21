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
    static readFile = (filename: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, "utf8", (err, data) => {
                if (err)
                    reject(err);
                else {
                    resolve(data)
                }
            })
        })
    }
    static writeFile = (filename: string, data: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename, data, (err) => {
                if (err)
                    reject(err);
                else {
                    resolve()
                }
            })
        })
    }
}
