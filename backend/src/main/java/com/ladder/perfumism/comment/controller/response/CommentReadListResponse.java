package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class CommentReadListResponse {

    @JsonProperty("commentList")
    private List<CommentReadResponse> commentList;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCOunt;

}
