package com.ladder.perfumism.vote.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class VoteChooseRequest {

    @JsonProperty("vote_id")
    private Long vote;

    @JsonProperty("vote_item_id")
    private Long voteItem;

    public VoteChooseRequest(){

    }

    public VoteChooseRequest(Long vote, Long voteItem){
        this.vote = vote;
        this.voteItem = voteItem;
    }
}
