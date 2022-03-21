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

    static save = async (m: Message): Promise<void> => {
        const start = `sqlite3 ./build/db/${m.subject}.db`
        const c = `${start} "CREATE TABLE if not exists replies (html TEXT, body TEXT, messageId TEXT, fromAddress TEXT, fromName TEXT, date TEXT);"`
        await ChildProcess.exec(c)

        const c2 = `${start} "INSERT INTO replies (html, body, fromAddress, fromName, date) VALUES('${sanitize(m.html)}', '${sanitize(m.text)}', '${m.from[0].address}', '${m.from[0].name}', '${m.date.toUTCString()}');"`
        await ChildProcess.exec(c2);
    }

    static fetch = async (): Promise<string[]> => {
        const titles = await PageBuilder.getPostNames();
        await client.connect();
        const messages: Message[] = await client.retrieveAll();
        await client.quit();

        const newReplies: string[] = (await Promise.all(messages.map(async m => {
            if (titles.includes(m.subject)) {
                await Email.save(m);
                return m.subject;
            }
            return null;
        }))).filter(m => !!m);

        return [...new Set(newReplies)];
    }
}

export default Email;
