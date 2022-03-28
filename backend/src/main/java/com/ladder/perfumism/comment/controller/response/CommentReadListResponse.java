package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.comment.domain.Comment;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class CommentReadListResponse {

    @JsonProperty("commentList")
    @ApiModelProperty(position = 0, notes = "댓글 목록")
    private List<CommentReadResponse> commentList;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "댓글 총 페이지 수", example = "2")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "댓글 현재 페이지", example = "3")
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
