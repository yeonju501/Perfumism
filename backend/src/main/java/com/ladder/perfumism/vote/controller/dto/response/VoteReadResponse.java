package com.ladder.perfumism.vote.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.vote.domain.VoteItem;
import lombok.Getter;

@Getter
public class VoteReadResponse {

    @JsonProperty("vote_item_id")
    private Long id;

    @JsonProperty("content")
    private String content;

    public VoteReadResponse(){

    }

    public VoteReadResponse(Long id, String content){
        this.id = id;
        this.content = content;
    }

    public static VoteReadResponse from(VoteItem voteItem){
        return new VoteReadResponse(
            voteItem.getId(),
            voteItem.getContent()
        );
    }
}
