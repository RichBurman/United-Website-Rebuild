import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { BlogPost } from '../../models/blog-post';
import { BlogService } from '../../services/blog/blog.service.ts';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private authService = inject(AuthService);
  private blogService = inject(BlogService);

  editingPostId = signal<string | null>(null);

  showCreateForm = signal(false);

  newPost = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    author: 'Richard Burman',
    published: false,
    tags: [] as string[],
  };

  editPost = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    author: '',
    publishedAt: '',
    published: false,
    tags: [] as string[],
  };

  tagOptions = ['Match', 'Transfers', 'Team News', 'Opinion', 'Tactics'];

  posts = signal<BlogPost[]>([]);
  email = '';
  password = '';

  errorMessage = signal('');
  isLoading = signal(false);
  isLoggedIn = signal(false);

  constructor() {
    this.checkAuthStatus();
  }

  async checkAuthStatus() {
    try {
      const user = await this.authService.getCurrentUser();

      console.log('Current user:', user);
      this.isLoggedIn.set(true);
      await this.loadPosts();
    } catch {
      this.isLoggedIn.set(false);
    }
  }

  async login() {
    this.errorMessage.set('');
    this.isLoading.set(true);

    try {
      await this.authService.login(this.email, this.password);

      this.isLoggedIn.set(true);
      await this.loadPosts();

      console.log('Login successful');
    } catch (error) {
      console.error(error);

      this.errorMessage.set('Unable to log in. Check your email and password.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout() {
    try {
      await this.authService.logout();

      this.isLoggedIn.set(false);
      this.email = '';
      this.password = '';

      console.log('Logged out');
    } catch (error) {
      console.error(error);
    }
  }

  async loadPosts() {
    try {
      const posts = await this.blogService.getAllPosts();
      this.posts.set(posts);
    } catch (error) {
      console.error('Unable to load admin posts:', error);
    }
  }

  async createPost() {
    try {
      const now = new Date().toISOString();

      await this.blogService.createPost({
        title: this.newPost.title,
        slug: this.newPost.slug,
        excerpt: this.newPost.excerpt,
        content: this.newPost.content,
        imageUrl: this.newPost.imageUrl,
        author: this.newPost.author,
        publishedAt: now,
        updatedAt: now,
        published: this.newPost.published,
        tags: this.newPost.tags,
      });

      this.showCreateForm.set(false);

      this.newPost = {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        author: 'Richard Burman',
        published: false,
        tags: [],
      };

      await this.loadPosts();
    } catch (error) {
      console.error('Unable to create post:', error);
    }
  }

  startEdit(post: BlogPost) {
    this.editingPostId.set(post.id);

    this.editPost = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      author: post.author,
      publishedAt: post.publishedAt,
      published: post.published,
      tags: [...post.tags],
    };
  }

  async saveEdit() {
    const id = this.editingPostId();

    if (!id) {
      return;
    }

    try {
      await this.blogService.updatePost(id, {
        title: this.editPost.title,
        slug: this.editPost.slug,
        excerpt: this.editPost.excerpt,
        content: this.editPost.content,
        imageUrl: this.editPost.imageUrl,
        author: this.editPost.author,
        publishedAt: this.editPost.publishedAt,
        updatedAt: new Date().toISOString(),
        published: this.editPost.published,
        tags: this.editPost.tags,
      });

      this.editingPostId.set(null);

      await this.loadPosts();
    } catch (error) {
      console.error('Unable to update post:', error);
    }
  }

  async deletePost(post: BlogPost) {
    const confirmed = confirm(
      `Are you sure you want to delete "${post.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await this.blogService.deletePost(post.id);

      await this.loadPosts();
    } catch (error) {
      console.error('Unable to delete post:', error);
    }
  }

  toggleNewPostTag(tag: string) {
    if (this.newPost.tags.includes(tag)) {
      this.newPost.tags = this.newPost.tags.filter(
        (existingTag) => existingTag !== tag,
      );
    } else {
      this.newPost.tags = [...this.newPost.tags, tag];
    }
  }

  toggleEditPostTag(tag: string) {
    if (this.editPost.tags.includes(tag)) {
      this.editPost.tags = this.editPost.tags.filter(
        (existingTag) => existingTag !== tag,
      );
    } else {
      this.editPost.tags = [...this.editPost.tags, tag];
    }
  }
}
