package com.ladder.perfumism.notification.domain;

import com.ladder.perfumism.comment.domain.Comment;
import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "type")
    private String type;

    @ManyToOne(targetEntity = Comment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    public Notification() {
    }

    @Builder
    public Notification(Member member, String type, Comment comment, LocalDateTime readAt) {
        this.member = member;
        this.type = type;
        this.comment = comment;
        this.readAt = readAt;
    }

    public void checkNotificationByEmail(String email) {
        if (!member.getEmail().equals(email)) {
            throw new BusinessException(ErrorCode.NOTIFICATION_NOT_MATCH_BY_EMAIL);
        }
    }

    public void changeReadAt() {
        readAt = LocalDateTime.now();
    }
}
