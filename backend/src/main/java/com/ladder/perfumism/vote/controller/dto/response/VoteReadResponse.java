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

    @JsonProperty("vote_member_count")
    @ApiModelProperty(position = 2, notes = "해당 항목에 투표한 인원", example = "4")
    private int voteMemberCount;

    public VoteReadResponse(){

    }

    public VoteReadResponse(Long id, String content, int voteMemberCount){
        this.id = id;
        this.content = content;
        this.voteMemberCount = voteMemberCount;
    }

    public static VoteReadResponse from(VoteItem voteItem){
        return new VoteReadResponse(
            voteItem.getId(),
            voteItem.getContent(),
            voteItem.getVoteMemberCount()
        );
    }
}
