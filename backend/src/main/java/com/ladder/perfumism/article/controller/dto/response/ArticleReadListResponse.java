package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.Article;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class ArticleReadListResponse {


    @JsonProperty("articleList")
    @ApiModelProperty(position = 0, notes = "게시글 목록")
    private List<ArticleReadResponse> articleList;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "게시글 총 페이지 수")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "게시글 현재 페이지")
    private int currentPageCount;

    public ArticleReadListResponse(){

    }

    public ArticleReadListResponse(List<ArticleReadResponse> articleList, int totalPageCount, int currentPageCount){
        this.articleList = articleList;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ArticleReadListResponse from(Page<Article> articleList){
        return new ArticleReadListResponse(
            articleList.stream()
                .map(ArticleReadResponse::from)
                .collect(Collectors.toList()),
            articleList.getTotalPages(),
            articleList.getNumber()
        );
    }


}
