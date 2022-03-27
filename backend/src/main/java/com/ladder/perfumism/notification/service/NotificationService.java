package com.ladder.perfumism.notification.service;

import com.ladder.perfumism.comment.domain.Comment;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.notification.controller.dto.response.NotificationResponse;
import com.ladder.perfumism.notification.domain.Notification;
import com.ladder.perfumism.notification.domain.NotificationRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final MemberService memberService;

    public NotificationService(NotificationRepository notificationRepository,
        MemberService memberService) {
        this.notificationRepository = notificationRepository;
        this.memberService = memberService;
    }

    @Transactional
    public void createCommentNotification(Comment comment) {
        Notification notification = Notification.builder()
            .member(comment.getArticle().getMember())
            .type("comment")
            .comment(comment)
            .build();
        notificationRepository.save(notification);
    }

    @Transactional
    public void createReplyNotification(Comment reply) {
        Notification notification = Notification.builder()
            .member(reply.getParentId().getMember())
            .type("reply")
            .comment(reply)
            .build();
        notificationRepository.save(notification);
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> showAllNotifications(String email) {
        Member member = memberService.findByEmail(email);
        LocalDateTime start = LocalDateTime.now().minusMonths(3);
        LocalDateTime end = LocalDateTime.now();
        List<Notification> notifications = notificationRepository.findAllByMemberAndCreatedAtBetween(member, start, end);
        return notifications.stream()
            .map(NotificationResponse::from)
            .collect(Collectors.toList());
    }
}
