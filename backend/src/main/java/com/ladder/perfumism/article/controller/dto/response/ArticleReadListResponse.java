package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class ArticleReadListResponse {


    @JsonProperty("articleList")
    private List<ArticleReadResponse> articleList;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;


}
