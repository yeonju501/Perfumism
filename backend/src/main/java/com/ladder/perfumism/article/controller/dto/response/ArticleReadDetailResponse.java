package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleSubject;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleReadDetailResponse  {

    @JsonProperty("subject")
    @ApiModelProperty(position = 0, notes = "게시글 id", example = "1")
    private ArticleSubject subject;

    @JsonProperty("title")
    @ApiModelProperty(position = 1, notes = "말머리", example = "TALK")
    private String title;

    @JsonProperty("content")
    @ApiModelProperty(position = 2, notes = "제목", example = "제목입니다")
    private String content;

    @JsonProperty("created_at")
    @ApiModelProperty(position = 3, notes = "내용", example = "내용입니다")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    @ApiModelProperty(position = 4, notes = "생성 시간", example = "2022-03-11")
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
