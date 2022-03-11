package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleSubject;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleReadDetailResponse  {

    @JsonProperty("subject")
    private ArticleSubject subject;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    public ArticleReadDetailResponse(){

    }

    public ArticleReadDetailResponse(ArticleSubject subject, String title, String content, LocalDateTime createdAt, LocalDateTime updatedAt){
        this.subject = subject;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ArticleReadDetailResponse from(Article article){
        return new ArticleReadDetailResponse(
            article.getSubject(),
            article.getTitle(),
            article.getContent(),
            article.getCreatedAt(),
            article.getUpdatedAt()
        );
    }

}
