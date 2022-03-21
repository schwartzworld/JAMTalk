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

    constructor(rString: string) {
        const [html, text, , email, name, dateString] = rString.split('|')
        this.html = decodeURIComponent(html).replace("''", "'");
        this.text = decodeURIComponent(text).replace("''", "'");
        this.email = email;
        this.name = name;
        this.date = new Date(dateString)
    }
}

export class Post {
    replies: Reply[];

    constructor(replies: Reply[]) {
        this.replies = replies.filter(r => !!r.name);
    }

    render() {
        return this.replies.map(reply => {
        return `
        <figure>
            <blockquote cite="${reply.email}">
                ${reply.html}
            </blockquote>
            <figcaption>—${reply.name}</figcaption>
        </figure>
        `
        }).join('');
    }

    static empty() {
        return new Post([])
    }

    static async create(title: string) {
        try {
          const replies = await getReplies(title)
          return new Post(replies.split(/\r?\n/).map(r => new Reply(r)));
        } catch (e) {
          return Post.empty();
        }
    }
}
