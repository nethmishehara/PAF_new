package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.Notification;
import com.example.backend.repository.Kavi.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // ✅ Create and return a new notification
    public Notification createNotification(String recipientUserId, String actorUserId, String postId, String type, String message) {
        Notification notification = new Notification();
        notification.setRecipientUserId(recipientUserId); // The one who receives the notification
        notification.setActorUserId(actorUserId);         // The one who triggers the action
        notification.setPostId(postId);                   // Related post
        notification.setMessage(message);
        notification.setType(type);
        notification.setUserId(recipientUserId);          // For compatibility with earlier code
        notification.setRead(false);                      // Initially unread
        notification.setCurrentTimestamp();               // Set the timestamp to the current time
        return notificationRepository.save(notification); // ✅ return saved object
    }

    // ✅ Get notifications received by a user
    public List<Notification> getNotificationsReceived(String userId) {
        return notificationRepository.findByRecipientUserId(userId);
    }

    // ✅ Get notifications sent by a user (triggered by user's actions)
    public List<Notification> getNotificationsSent(String actorUserId) {
        return notificationRepository.findByActorUserId(actorUserId);
    }

    // ✅ Mark a specific notification as read and return success status
    public boolean markNotificationAsRead(String notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);
        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setRead(true);
            notificationRepository.save(notification);
            return true;
        }
        return false;
    }
}
