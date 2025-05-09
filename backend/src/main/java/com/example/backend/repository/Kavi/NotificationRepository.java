package com.example.backend.repository.Kavi;

import com.example.backend.model.Kavi.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
 List<Notification> findByRecipientUserId(String userId);
   // List<Notification> findByRecipientUserIdOrderByTimestampDesc(String userId);

    List<Notification> findByActorUserId(String userId);
}
