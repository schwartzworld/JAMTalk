import {FS} from "../FS/FS";
import {Post} from "../Post/Post";
import {ChildProcess} from "../ChildProcess/ChildProcess";

const head = `
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>schwartz.world</title>
  <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura-dark.css" type="text/css">
  <style>
    .qr {
        position: fixed;
        right: 3rem;
        top: 3rem;
    }
  </style>
</head>

<body>
`;

const foot = `
<small>
	Repo available to view  <a href="https://github.com/schwartzworld/JAMTalk">
		GitHub
	</a>
</small>
</body>

</html>
`

export class PageBuilder {
    static savePosts = async (postMap: Map<string, string>): Promise<void> => {
        ([...postMap.entries()].forEach(([title, html]) => {
            FS.writeFile(`./site/${title}.html`, html)
                .then(() => {
                    console.log(`${title} built`)
                })
        }))
    }

    static buildIndex = async (titles: string[]) => {
        const links = titles.map(title => {
            return `<li><a href="/${title}.html">${title}</a></li>`
        }).join('');
        const html = PageBuilder.wrap(`<ul>${links}</ul>`)
        return await FS.writeFile(`./site/index.html`, html)
    }

    static wrap = (htmlString: string) => {
        return head + htmlString + foot;
    }

    static generateQRCode = async (title: string, link: string) => {
        await ChildProcess.exec(`qrencode -o "./site/qrs/${title}.png" "${link}"`)
        return `<img class="qr" src="/qrs/${title}.png" alt="${link}" />`
    }


    static generateHTML = async (posts: Post[]): Promise<Map<string, string>> => {
        const map = new Map()
        await Promise.all(posts.map(async ( post) => {
            const body = await post.renderBody()
            const replies = post.renderReplies();
            const replyLink = post.getReplyLink();
            const QR = await PageBuilder.generateQRCode(post.title, post.replyLink())
            map.set(post.title, PageBuilder.wrap(body + QR + replyLink + replies));
        }));
        return map;
    }

    static createPosts = async (postTitles: string[]) => {
        if (!postTitles.length) {
            const titles = await PageBuilder.getDBnames()
            return await Promise.all(titles.map(post => {
                return Post.create(post);
            }))
        } else {
            return await Promise.all(postTitles.map(post => {
                return Post.create(post);
            }))
        }
    }

    static buildNew = async (postTitles: string[]) => {
        const posts = await PageBuilder.createPosts(postTitles)
        const htmlMap = await PageBuilder.generateHTML(posts)
        const success = await PageBuilder.savePosts(htmlMap)
    }

    static getDBnames = async (): Promise<string[]> => {
        const files = await FS.readdir('./build/db')
        return [...new Set(files.map(f => f.split('.')[0]))];
    }

    static getPostNames = async (): Promise<string[]> => {
        const files = (await FS.readdir('./src/slides')).filter(f => f.includes('.md'))
        return [...new Set(files.map(f => f.split('.')[0]))];
    }
}
