import { Injectable } from '@angular/core';
import { Query } from 'appwrite';

import { BlogPost } from '../../models/blog-post';
import { tablesDB, databaseId, blogPostsTableId } from '../../appwrite';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  async getPosts(): Promise<BlogPost[]> {
    const response = await tablesDB.listRows({
      databaseId,
      tableId: blogPostsTableId,
      queries: [Query.equal('published', true), Query.orderDesc('publishedAt')],
    });

    return response.rows.map((row) => ({
      id: row.$id,
      title: row['title'] as string,
      slug: row['slug'] as string,
      excerpt: row['excerpt'] as string,
      content: row['content'] as string,
      imageUrl: (row['imageUrl'] as string) ?? '',
      author: row['author'] as string,
      publishedAt: row['publishedAt'] as string,
      updatedAt: row['updatedAt'] as string,
      published: row['published'] as boolean,
    }));
  }

  async getAllPosts(): Promise<BlogPost[]> {
    const response = await tablesDB.listRows({
      databaseId,
      tableId: blogPostsTableId,
      queries: [Query.orderDesc('updatedAt')],
    });

    return response.rows.map((row) => ({
      id: row.$id,
      title: row['title'] as string,
      slug: row['slug'] as string,
      excerpt: row['excerpt'] as string,
      content: row['content'] as string,
      imageUrl: (row['imageUrl'] as string) ?? '',
      author: row['author'] as string,
      publishedAt: row['publishedAt'] as string,
      updatedAt: row['updatedAt'] as string,
      published: row['published'] as boolean,
    }));
  }

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const response = await tablesDB.listRows({
      databaseId,
      tableId: blogPostsTableId,
      queries: [
        Query.equal('slug', slug),
        Query.equal('published', true),
        Query.limit(1),
      ],
    });

    const row = response.rows[0];

    if (!row) {
      return undefined;
    }

    return {
      id: row.$id,
      title: row['title'] as string,
      slug: row['slug'] as string,
      excerpt: row['excerpt'] as string,
      content: row['content'] as string,
      imageUrl: (row['imageUrl'] as string) ?? '',
      author: row['author'] as string,
      publishedAt: row['publishedAt'] as string,
      updatedAt: row['updatedAt'] as string,
      published: row['published'] as boolean,
    };
  }
}
