package com.ladder.perfumism.comment.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class CommentCreateRequest {

    @JsonProperty("content")
    @ApiModelProperty(required = true, position = 0, notes = "내용", example = "나는 쓴다 댓글 여기에")
    private String content;

    protected CommentCreateRequest(){

    }

    public CommentCreateRequest(String content){
        this.content = content;
    }
}
