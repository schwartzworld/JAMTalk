import {FS} from "../FS/FS";
import {Post} from "../Post/Post";

export class PageBuilder {

    static generateHTML = async (posts: Post[]) => {
        return posts.map(post => post.render()).join('\n');
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
        const html = await PageBuilder.generateHTML(posts)
        console.log(html)
    }

    static getDBnames = async (): Promise<string[]> => {
        const files = await FS.readdir('./build/db')
        return [...new Set(files.map(f => f.split('.')[0]))];
    }
    static getPostNames = async (): Promise<string[]> => {
        const files = await FS.readdir('./src/slides')
        return [...new Set(files.map(f => f.split('.')[0]))];
    }
}
