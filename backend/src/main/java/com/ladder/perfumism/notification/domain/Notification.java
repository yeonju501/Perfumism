package com.ladder.perfumism.notification.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.member.domain.Member;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "type")
    private String type;

    @Column(name = "article_id")
    private Long article_id;

    @Column(name = "content_id")
    private Long content_id;

    @Column(name = "message")
    private String message;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    public Notification() {
    }

    @Builder
    public Notification(Member member, String type, Long article_id, Long content_id, String message, LocalDateTime readAt){
        this.member = member;
        this.type = type;
        this.article_id = article_id;
        this.content_id = content_id;
        this.message = message;
        this.readAt = readAt;
    }
}
