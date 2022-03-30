package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.comment.domain.Comment;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class CommentMyReadResponse {

    @JsonProperty("comment_id")
    @ApiModelProperty(position = 0, notes = "댓글 ID", example = "1")
    private Long commentId;

    @JsonProperty("article_id")
    @ApiModelProperty(position = 1, notes = "게시글 ID", example = "1")
    private Long articleId;

    @JsonProperty("content")
    @ApiModelProperty(required = true, position = 2, notes = "내용", example = "나는 쓴다 댓글 여기에")
    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("created_at")
    @ApiModelProperty(position = 3, notes = "생성 시간", example = "2022-03-13 14:59:51")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("updated_at")
    @ApiModelProperty(position = 4, notes = "수정 시간", example = "2023-4-14 14:59:51")
    private LocalDateTime updatedAt;

    public CommentMyReadResponse(){

    }

    public CommentMyReadResponse(
        Long commentId, Long articleId, String content,
        LocalDateTime createdAt, LocalDateTime updatedAt){

        this.commentId = commentId;
        this.articleId = articleId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static CommentMyReadResponse from(Comment comment){
        return new CommentMyReadResponse(
            comment.getId(),
            comment.getArticle().getId(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt()
        );
    }
}
