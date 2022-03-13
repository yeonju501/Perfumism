package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleSubject;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleReadResponse {

    @JsonProperty("article_id")
    @ApiModelProperty(position = 0, notes = "게시글 id", example = "1")
    private Long articleId;

    @JsonProperty("subject")
    @ApiModelProperty(position = 1, notes = "말머리", example = "TALK")
    private ArticleSubject subject;

    @JsonProperty("title")
    @ApiModelProperty(position = 2, notes = "제목", example = "제목입니다")
    private String title;

    @JsonProperty("content")
    @ApiModelProperty(position = 3, notes = "내용", example = "내용입니다")
    private String content;

    @JsonProperty("createAt")
    @ApiModelProperty(position = 4, notes = "생성 시간", example = "2022,3,13,14,59,51,0000000")
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
