package com.example.backend.controller.Kavi;

import com.example.backend.model.Kavi.Notification;
import com.example.backend.service.Kavi.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // ✅ Create a notification manually (for testing/debugging)
    @PostMapping("/create")
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(
                notification.getRecipientUserId(),
                notification.getActorUserId(),
                notification.getPostId(),
                notification.getType(),
                notification.getMessage()
        );
    }

    // ✅ Get notifications received by a user
    @GetMapping("/received/{userId}")
    public List<Notification> getReceivedNotifications(@PathVariable String userId) {
        return notificationService.getNotificationsReceived(userId);
    }

    // ✅ Get notifications sent by a user
    @GetMapping("/sent/{userId}")
    public List<Notification> getSentNotifications(@PathVariable String userId) {
        return notificationService.getNotificationsSent(userId);
    }

    // ✅ Get all relevant notifications for a user's bell icon (received only)
    @GetMapping("/user/{userId}")
    public List<Notification> getAllNotificationsForUser(@PathVariable String userId) {
        return notificationService.getNotificationsReceived(userId);
    }

    // ✅ Mark a notification as read
    @PutMapping("/mark-read/{id}")
    public boolean markAsRead(@PathVariable String id) {
        return notificationService.markNotificationAsRead(id);
    }
}
