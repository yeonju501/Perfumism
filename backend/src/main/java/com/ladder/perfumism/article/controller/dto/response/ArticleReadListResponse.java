package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.Article;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class ArticleReadListResponse {


    @JsonProperty("articleList")
    private List<ArticleReadResponse> articleList;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
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
