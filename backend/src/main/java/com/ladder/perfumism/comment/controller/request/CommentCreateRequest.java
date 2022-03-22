package com.ladder.perfumism.comment.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CommentCreateRequest {

    @JsonProperty("content")
    private String content;

    protected CommentCreateRequest(){

    }

    public CommentCreateRequest(String content){
        this.content = content;
    }
}
