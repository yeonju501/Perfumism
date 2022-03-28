package com.ladder.perfumism.vote.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.vote.domain.VoteItem;
import java.util.List;
import lombok.Getter;

@Getter
public class VoteCreateRequest {

    @JsonProperty("title")
    private String title;

    @JsonProperty("vote_item_list")
    private List<String> voteItemList;

    public VoteCreateRequest(){

    }

    public VoteCreateRequest(String title, List<String> voteItemList){
        this.title = title;
        this.voteItemList = voteItemList;
    }
}
