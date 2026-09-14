import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BlogCard } from '../../components/blog-card/blog-card';
import { BlogService } from '../../services/blog/blog.service.ts';
@Component({
  selector: 'app-blog',
  imports: [BlogCard, AsyncPipe],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  private blogService = inject(BlogService);

  posts = this.blogService.getPosts();
}
