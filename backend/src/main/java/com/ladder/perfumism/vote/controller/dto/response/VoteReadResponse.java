package com.ladder.perfumism.vote.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.vote.domain.VoteItem;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class VoteReadResponse {

    @JsonProperty("vote_item_id")
    @ApiModelProperty(position = 0, notes = "투표 항목 id", example = "1")
    private Long id;

    @JsonProperty("content")
    @ApiModelProperty(position = 1, notes = "투표 항목", example = "first")
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
