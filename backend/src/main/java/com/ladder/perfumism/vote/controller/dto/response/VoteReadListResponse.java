package com.ladder.perfumism.vote.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.vote.domain.Vote;
import com.ladder.perfumism.vote.domain.VoteItem;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class VoteReadListResponse {

    @JsonProperty("vote_id")
    private Long voteId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("vote_item_list")
    private List<VoteReadResponse> voteItemList;

    @JsonProperty("total_voter")
    private int totalVoter;

    public VoteReadListResponse(){

    }

    public VoteReadListResponse(
        Long voteId, String title, List<VoteReadResponse> voteItemList, int totalVoter){
        this.voteId = voteId;
        this.title = title;
        this.voteItemList = voteItemList;
        this.totalVoter = totalVoter;
    }

    public static VoteReadListResponse from(Vote vote, List<VoteItem> voteItem){
        return new VoteReadListResponse(
            vote.getId(),
            vote.getTitle(),
            voteItem.stream()
                .map(VoteReadResponse::from)
                .collect(Collectors.toList()),
            vote.getTotalVoter()

        );
    }
}
