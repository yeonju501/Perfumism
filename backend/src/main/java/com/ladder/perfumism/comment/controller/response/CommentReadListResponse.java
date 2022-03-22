package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.comment.domain.Comment;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class CommentReadListResponse {

    @JsonProperty("commentList")
    private List<CommentReadResponse> commentList;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public CommentReadListResponse(){

    }

    public CommentReadListResponse(List<CommentReadResponse> commentList, int totalPageCount, int currentPageCount){
        this.commentList = commentList;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static CommentReadListResponse from(Page<Comment> commentList){
        return new CommentReadListResponse(
            commentList.stream()
                .map(CommentReadResponse::from)
                .collect(Collectors.toList()),
            commentList.getTotalPages(),
            commentList.getNumber()
        );
    }
}
