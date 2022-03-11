package com.ladder.perfumism.article.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.ArticleSubject;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ArticleCreateRequest {

    @JsonProperty("subject")
    @ApiModelProperty(required = true, position = 0, notes = "말머리", example = "TALK")
    private ArticleSubject subject;

    @JsonProperty("title")
    @ApiModelProperty(required = true, position = 1, notes = "제목", example = "반가워 나는 제목이라고해")
    private String title;

    @JsonProperty("content")
    @ApiModelProperty(required = true, position = 2, notes = "내용", example = "아 그래? 나는 내용이라고해! 우리 잘 지내보자 ^_^")
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
