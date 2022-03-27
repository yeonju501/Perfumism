package com.ladder.perfumism.notification.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.notification.domain.Notification;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class NotificationResponse {

    @JsonProperty("notification_id")
    @ApiModelProperty(position = 0, notes = "알림 id", example = "1")
    private Long id;

    @JsonProperty("type")
    @ApiModelProperty(position = 1, notes = "알림 타입", example = "comment")
    private String type;

    @JsonProperty("article_id")
    @ApiModelProperty(position = 2, notes = "게시글 id", example = "1")
    private Long articleId;

    @JsonProperty("article_title")
    @ApiModelProperty(position = 3, notes = "게시글 제목(comment 타입)", example = "향수 추천 받아요")
    private String articleTitle;

    @JsonProperty("comment_id")
    @ApiModelProperty(position = 4, notes = "댓글 id(reply 타입)", example = "1")
    private Long commentId;

    @JsonProperty("comment_content")
    @ApiModelProperty(position = 5, notes = "댓글 내용(reply 타입)", example = "조말론 우드 세이지 앤 씨솔트 괜찮던데요?")
    private String commentContent;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("created_at")
    @ApiModelProperty(position = 6, notes = "알림 생성 일시", example = "2022-03-27 11:46:47" )
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("read_at")
    @ApiModelProperty(position = 7, notes = "알림 확인 일시(읽지 않았을 경우 null)", example = "2022-03-27 11:46:47")
    private LocalDateTime readAt;

    public NotificationResponse() {
    }

    public NotificationResponse(Long id, String type, Long articleId, String articleTitle, Long commentId, String commentContent,
        LocalDateTime createdAt, LocalDateTime readAt) {
        this.id = id;
        this.type = type;
        this.articleId = articleId;
        this.articleTitle = articleTitle;
        this.commentId = commentId;
        this.commentContent = commentContent;
        this.createdAt = createdAt;
        this.readAt = readAt;
    }

    public static NotificationResponse from(Notification notification) {
        if (notification.getType().equals("comment")) {
            return new NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getComment().getArticle().getId(),
                notification.getComment().getArticle().getTitle(),
                null,
                null,
                notification.getCreatedAt(),
                notification.getReadAt()
            );
        } else {
            return new NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getComment().getArticle().getId(),
                null,
                notification.getComment().getParentId().getId(),
                notification.getComment().getParentId().getContent(),
                notification.getCreatedAt(),
                notification.getReadAt()
            );
        }
    }
}
