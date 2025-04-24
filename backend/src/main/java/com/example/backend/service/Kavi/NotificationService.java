package com.example.backend.service.Kavi;

import com.example.backend.model.Kavi.Notification;
import com.example.backend.repsitory.KaviNotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }
    
    

    public void markAllAsRead(String userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        for (Notification notification : notifications) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }
}
