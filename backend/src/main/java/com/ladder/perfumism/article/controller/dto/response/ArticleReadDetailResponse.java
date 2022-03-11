package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.ArticleSubject;
import lombok.Getter;

@Getter
public class ArticleReadDetailResponse  {

    @JsonProperty("subject")
    private ArticleSubject subject;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

}
