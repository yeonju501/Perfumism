package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
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

}
