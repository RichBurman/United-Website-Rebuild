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

  async createPost(post: Omit<BlogPost, 'id'>): Promise<void> {
    await tablesDB.createRow({
      databaseId,
      tableId: blogPostsTableId,
      rowId: 'unique()',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        published: post.published,
      },
    });
  }

  async updatePost(id: string, post: Omit<BlogPost, 'id'>): Promise<void> {
    await tablesDB.updateRow({
      databaseId,
      tableId: blogPostsTableId,
      rowId: id,
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        published: post.published,
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    await tablesDB.deleteRow({
      databaseId,
      tableId: blogPostsTableId,
      rowId: id,
    });
  }
}
