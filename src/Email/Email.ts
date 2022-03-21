import { config } from 'dotenv';
import { Client, Message } from 'yapople';
import {FS} from "../FS/FS";
import {ChildProcess} from "../ChildProcess/ChildProcess";
import {PageBuilder} from "../PageBuilder/PageBuilder";

config();

const client = new Client({
    host: 'pop.gmail.com',
    port:  995,
    tls: true,
    mailparser: true,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
});

const sanitize = (text: string) => {
    return encodeURIComponent(text.replace(/'/g, "''"))
}

class Email {
    public data: any;
    constructor(data: any) {
        this.data = data;
    }

    static initDB = async (name: string) => {
        const c = `sqlite3 ./build/db/${name}.db "CREATE TABLE if not exists replies (html TEXT, body TEXT, messageId TEXT, subject TEXT, fromAddress TEXT, fromName TEXT, date TEXT);"`
        return await ChildProcess.exec(c)
    }

    static save = async (m: Message, title: string): Promise<void> => {
        const c2 = `sqlite3 ./build/db/${title}.db "INSERT INTO replies (html, body, fromAddress, fromName, date, subject) VALUES('${sanitize(m.html)}', '${sanitize(m.text)}', '${m.from[0].address}', '${m.from[0].name}', '${m.date.toUTCString()}', '${sanitize(m.subject)}');"`
        await ChildProcess.exec(c2);
    }

    static fetch = async (): Promise<string[]> => {
        const titles = await PageBuilder.getPostNames();
        await Promise.all(titles.map(async (title) => {
            return await Email.initDB(title)
        }));
        await client.connect();
        const messages: Message[] = await client.retrieveAll();
        await client.quit();

        const newReplies: string[] = (await Promise.all(messages.map(async m => {
            const [, afterPlus] = m.to[0].address.split('+');
            const [postTitle] = afterPlus.split('@');
            if (titles.includes(postTitle)) {
                await Email.save(m, postTitle);
                return postTitle;
            }
            return null;
        }))).filter(m => !!m);

        return [...new Set(newReplies)];
    }
}

export default Email;
