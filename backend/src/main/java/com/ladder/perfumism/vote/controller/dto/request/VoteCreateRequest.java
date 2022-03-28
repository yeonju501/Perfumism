package com.ladder.perfumism.vote.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.vote.domain.VoteItem;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@Getter
public class VoteCreateRequest {

    @JsonProperty("title")
    @ApiModelProperty(required = true, position = 0, notes = "투표 제목", example = "투표 합시다")
    private String title;

    @JsonProperty("vote_item_list")
    @ApiModelProperty(required = true, position = 1, notes = "투표 항목", example = "[first, second, third]", dataType = "List")
    private List<String> voteItemList;

    public VoteCreateRequest(){

    }

    public VoteCreateRequest(String title, List<String> voteItemList){
        this.title = title;
        this.voteItemList = voteItemList;
    }
}
