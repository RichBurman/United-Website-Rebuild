import { Component, input } from '@angular/core';
import { BlogPost } from '../../models/blog-post';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
})
export class BlogCard {
  post = input.required<BlogPost>();
}
