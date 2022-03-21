import {ChildProcess} from "../ChildProcess/ChildProcess";

const getReplies = (title) => {
    const start = `sqlite3 ./build/db/${title}.db`
    return ChildProcess.exec(`${start} "select * from replies;"`)
}

class Reply {
    html: string;
    text: string;
    email: string;
    date: Date;
    name: string;
    subject: string;

    constructor(rString: string) {
        const [html, text, , subject, email, name, dateString] = rString.split('|')
        this.html = decodeURIComponent(html).replace(/''/g, "'");
        this.text = decodeURIComponent(text).replace(/''/g, "'");
        this.email = email;
        this.name = name;
        this.date = new Date(dateString)
        this.subject = decodeURIComponent(subject).replace(/''/g, "'");
    }
}

interface PostConstructor {
    replies: Reply[];
    title: string;
}

export class Post {
    replies: Reply[];
    title: string;

    constructor({title, replies}: PostConstructor) {
        this.replies = replies.filter(r => !!r.name);
        this.title = title;
    }

    renderBody = async (): Promise<string> => {
        const body = await ChildProcess.exec(`pandoc ./src/slides/${this.title}.md`);
        return body;
    }

    renderReplies(): string {
        return this.replies.map(reply => {

            return `
            <figure>
                <blockquote cite="${reply.name}">
                <h5>${reply.subject}</h5>
                ${reply.html}
                </blockquote>
                <figcaption>—${reply.name}</figcaption>
            </figure>
            `
        }).join('');
    }

    replyLink = () => {
        const [username, extension] = process.env.USERNAME.split('@');
        return `mailto:${username}+${this.title}@${extension}`
    }

    getReplyLink = () => {
        return `<a href="${this.replyLink()}">Email to leave a comment!</a>`
    }
    static empty(title: string) {
        return new Post({title, replies: []})
    }

    static async create(title: string) {
        try {
          const replies = (await getReplies(title))
              .split(/\r?\n/)
              .map(r => new Reply(r))
          return new Post({ title, replies });
        } catch (e) {
          return Post.empty(title);
        }
    }
}
