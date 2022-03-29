package com.ladder.perfumism.vote.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class VoteChooseRequest {

    @JsonProperty("vote_item_id")
    @ApiModelProperty(required = true, position = 2, notes = "투표 항목 ID", example = "3")
    private Long voteItem;

    public VoteChooseRequest(){

    }

    public VoteChooseRequest(Long voteItem){
        this.voteItem = voteItem;
    }
}
