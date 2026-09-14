import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { BlogService } from '../../services/blog/blog.service.ts';


@Component({
  selector: 'app-blog-post',
  imports: [DatePipe, RouterLink],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
})
export class BlogPost {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  slug = this.route.snapshot.paramMap.get('slug');

  post = this.slug
    ? this.blogService.getPostBySlug(this.slug)
    : undefined;
}