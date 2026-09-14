import { Component, computed, inject, signal } from '@angular/core';

import { BlogCard } from '../../components/blog-card/blog-card';
import { BlogPost } from '../../models/blog-post';
import { BlogService } from '../../services/blog/blog.service.ts';


@Component({
  selector: 'app-blog',
  imports: [BlogCard],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  private blogService = inject(BlogService);

  posts = signal<BlogPost[]>([]);
  selectedTag = signal('All');

  tagOptions = [
    'All',
    'Match',
    'Transfers',
    'Team News',
    'Opinion',
    'Tactics',
  ];

  filteredPosts = computed(() => {
    const selectedTag = this.selectedTag();

    if (selectedTag === 'All') {
      return this.posts();
    }

    return this.posts().filter((post) =>
      post.tags.includes(selectedTag),
    );
  });

  constructor() {
    this.loadPosts();
  }

  async loadPosts() {
    const posts = await this.blogService.getPosts();

    this.posts.set(posts);
  }
}