package com.ladder.perfumism.vote.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.vote.domain.Vote;
import com.ladder.perfumism.vote.domain.VoteItem;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class VoteReadListResponse {

    @JsonProperty("vote_id")
    @ApiModelProperty(position = 0, notes = "투표 아이디", example = "1")
    private Long voteId;

    @JsonProperty("title")
    @ApiModelProperty(position = 1, notes = "투표 제목", example = "투표 합시다")
    private String title;

    @JsonProperty("vote_item_list")
    @ApiModelProperty(position = 2, notes = "투표 항목 리스트")
    private List<VoteReadResponse> voteItemList;

    @JsonProperty("total_voter")
    @ApiModelProperty(position = 3, notes = "투표한 총 인원", example = "0")
    private int totalVoter;

    @JsonProperty("expiration")
    @ApiModelProperty(position = 4, notes = "투표 만료 여부", example = "false(투표가능) or true(투표종료)")
    private Boolean expiration;

    public VoteReadListResponse(){

    }

    public VoteReadListResponse(
        Long voteId, String title, List<VoteReadResponse> voteItemList, int totalVoter, Boolean expiration){
        this.voteId = voteId;
        this.title = title;
        this.voteItemList = voteItemList;
        this.totalVoter = totalVoter;
        this.expiration = expiration;
    }

    public static VoteReadListResponse from(Vote vote, List<VoteItem> voteItem){
        return new VoteReadListResponse(
            vote.getId(),
            vote.getTitle(),
            voteItem.stream()
                .map(VoteReadResponse::from)
                .collect(Collectors.toList()),
            vote.getTotalVoter(),
            vote.getExpiration()

        );
    }
}
