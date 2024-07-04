import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  isVisible: boolean = false;

  showNotification(message: string, type: 'success' | 'error' = 'success') {
    this.message = message;
    this.type = type;
    this.isVisible = true;
    setTimeout(() => this.closeNotification(), 3000); // Auto-hide after 3 seconds
  }

  closeNotification() {
    this.isVisible = false;
  }
}
