package com.ladder.perfumism.notification.service;

import com.ladder.perfumism.comment.domain.Comment;
import com.ladder.perfumism.notification.domain.Notification;
import com.ladder.perfumism.notification.domain.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public void createCommentNotification(Comment comment) {
        Notification notification = Notification.builder()
            .member(comment.getArticle().getMember())
            .type("comment")
            .article_id(comment.getArticle().getId())
            .content_id(comment.getId())
            .message(comment.getArticle().getTitle())
            .build();
        notificationRepository.save(notification);
    }

    @Transactional
    public void createReplyNotification(Comment reply){
        Notification notification = Notification.builder()
            .member(reply.getParentId().getMember())
            .type("reply")
            .article_id(reply.getArticle().getId())
            .content_id(reply.getParentId().getId())
            .message(reply.getParentId().getContent())
            .build();
        notificationRepository.save(notification);
    }

}
