package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.comment.domain.Comment;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class CommentReadResponse {

    @JsonProperty("comment_id")
    private Long commentId;

    @JsonProperty("member_id")
    private Long memberId;

    @JsonProperty("member_name")
    private String memberName;

    @JsonProperty("article_id")
    private Long articleId;

    @JsonProperty("content")
    private String content;

    @JsonProperty("createAt")
    private LocalDateTime createAt;

    @JsonProperty("updateAt")
    private LocalDateTime updateAt;

    public CommentReadResponse(){

    }

    public CommentReadResponse(Long commentId, Long memberId, String memberName, Long articleId, String content, LocalDateTime createAt, LocalDateTime updateAt){
        this.commentId = commentId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.articleId = articleId;
        this.content = content;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public static CommentReadResponse from(Comment comment){
        return new CommentReadResponse(
            comment.getId(),
            comment.getMember().getId(),
            comment.getMember().getUsername(),
            comment.getArticle().getId(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt()
        );
    }

}
