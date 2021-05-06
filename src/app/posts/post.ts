export class Post {
    title: string;
    content: string;
    author: string;
    authorID: string;
    image: string;
    published: Date;
    id?: string;
    comments: Comment[] = [];
}
export class Comment {
  content: string;
  name: string;
}
