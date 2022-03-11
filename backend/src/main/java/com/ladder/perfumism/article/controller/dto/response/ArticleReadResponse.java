package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.ArticleSubject;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleReadResponse {

    @JsonProperty("article_id")
    private Long articleId;

    @JsonProperty("subject")
    private ArticleSubject subject;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonProperty("createAt")
    private LocalDateTime createAt;

}
