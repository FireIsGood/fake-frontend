import { Feed } from '../components/feed/feed.component';
import { Post } from '../components/post/post.component';

const explorePosts: Post[] = [
  { id: 1, title: "I'm the best", content: "It's true" },
  { id: 2, title: 'Five Hundred', content: "Too big!! I can't possibly read that many..." },
  {
    id: 3,
    title: 'Cool test post',
    content:
      "I'm a test post with a lot of content. I wonder how much conte they will allow me to put before I get pointed at with the Test Pointer",
  },
  { id: 4, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 5, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 6, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 7, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 8, title: 'I ran out of ideas', content: "just kidding, here's an amogus: &trade;" },
  { id: 9, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 10, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 11, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 12, title: 'I ran out of ideas', content: "So here's a generic post" },
  { id: 13, title: 'I ran out of ideas', content: "So here's a generic post" },
];

const catsPosts: Post[] = [
  { id: 101, title: 'Cats', content: "They're the best!" },
  { id: 102, title: 'Dogs', content: "They're the worst!" },
];

const feedTable: Record<Feed, Post[]> = {
  explore: explorePosts,
  cats: catsPosts,
};

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getFeed(feed: Feed): Promise<Post[]> {
  await timeout(500);
  return feedTable[feed];
}

export async function getPost(id: number): Promise<Post | undefined> {
  await timeout(500);
  const allPosts = Object.values(feedTable).flat();
  return allPosts.find((post) => post.id === id);
}
