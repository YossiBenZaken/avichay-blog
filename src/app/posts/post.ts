export class Post {
  title: string;
  content: string;
  author: string;
  authorID: string;
  image: string;
  published: Date;
  id?: string;
  comments: Comment[] = [];
  views: number;
  tags: string[];
  draft: boolean;
}
export class Comment {
  content: string;
  name: string;
}
export class Tag {
  id?: string;
  tag: string;
}
