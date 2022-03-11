package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.Article;
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

    public ArticleReadResponse(){

    }

    public ArticleReadResponse(Long articleId, ArticleSubject subject, String title, String content,
        LocalDateTime createdAt){
        this.articleId = articleId;
        this.subject = subject;
        this.title = title;
        this.content = content;
        this.createAt = createdAt;
    }

    public static ArticleReadResponse from(Article article){
        return new ArticleReadResponse(
            article.getId(),
            article.getSubject(),
            article.getTitle(),
            article.getContent(),
            article.getCreatedAt()
        );
    }

}
