package com.ladder.perfumism.article.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.ArticleSubject;
import lombok.Getter;

@Getter
public class ArticleCreateRequest {

    @JsonProperty("subject")
    private ArticleSubject subject;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    protected ArticleCreateRequest(){

    }

    public ArticleCreateRequest(ArticleSubject subject, String title, String content)
    {
        this.subject = subject;
        this.title = title;
        this.content = content;
    }
}
