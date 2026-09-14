import { Injectable } from '@angular/core';
import { BlogPost } from '../../models/blog-post';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private posts: BlogPost[] = [
    {
      id: '1',
      title: 'Manchester United Start the Season Strong',
      slug: 'manchester-united-start-the-season-strong',
      excerpt:
        'A look at Manchester United’s opening games and what we have learned so far.',
      content:
        'Manchester United have started the new season with plenty of talking points. This is our first test blog post and will eventually be replaced with content stored in Supabase.',
      imageUrl: '',
      author: 'Richard Burman',
      publishedAt: '2026-09-10T10:00:00Z',
      updatedAt: '2026-09-10T10:00:00Z',
      published: true,
    },
    {
      id: '2',
      title: 'What to Expect From United This Season',
      slug: 'what-to-expect-from-united-this-season',
      excerpt:
        'Looking ahead at the key players, competitions and challenges facing United.',
      content:
        'There is plenty to look forward to this season. This second mock post gives us enough data to build and test the blog page before connecting a database.',
      imageUrl: '',
      author: 'Richard Burman',
      publishedAt: '2026-09-08T10:00:00Z',
      updatedAt: '2026-09-08T10:00:00Z',
      published: true,
    },
  ];

  getPosts(): BlogPost[] {
    return this.posts.filter((post) => post.published);
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find((post) => post.slug === slug && post.published);
  }
}
