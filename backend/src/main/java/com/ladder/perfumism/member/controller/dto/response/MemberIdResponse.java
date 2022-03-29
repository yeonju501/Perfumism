package com.ladder.perfumism.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

public class MemberIdResponse {

    @JsonProperty("member_id")
    @ApiModelProperty(notes = "회원 ID", example = "1")
    private Long id;

    public MemberIdResponse(Long id) {
        this.id = id;
    }

    public static MemberIdResponse from(Long id) {
        return new MemberIdResponse(id);
    }
}
