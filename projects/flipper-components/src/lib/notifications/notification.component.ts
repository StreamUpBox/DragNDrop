import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification, NotificationType } from './notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'flipper-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationListComponent implements OnInit, OnDestroy {

  notifications: Notification[] = [];
  private subscription: Subscription;

  constructor(private notificationSvc: NotificationService) { }

  private addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);

    }
  }

  ngOnInit() {
    this.subscription = this.notificationSvc.getObservable().subscribe(notification => this.addNotification(notification));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


  className(notification: Notification): string {

    let style: string;

    switch (notification.type) {

      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }
}
