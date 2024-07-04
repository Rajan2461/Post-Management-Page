import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  editingPostId: number | null = null;
  postContent: string = '';

  @ViewChild('notification') notification: NotificationComponent | undefined;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  updatePost(post: any, notification: NotificationComponent): void {
    if (this.editingPostId !== null) {
      this.postService.updatePost(this.editingPostId, { ...post, body: this.postContent }).subscribe(() => {
        this.fetchPosts();
        this.editingPostId = null;
        this.postContent = '';
        notification.showNotification('Post updated successfully', 'success');
      });
    } else {
      this.editingPostId = post.id;
      this.postContent = post.body;
    }
  }

  deletePost(id: number, notification: NotificationComponent): void {
    this.postService.deletePost(id).subscribe(() => {
      this.fetchPosts();
      notification.showNotification('Post deleted successfully', 'success');
    });
  }
}
