package com.ladder.perfumism.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberUpdateRequest {

    @ApiModelProperty(name = "성별", example = "0")
    @JsonProperty("gender")
    private int gender;

    public MemberUpdateRequest() {
    }

    public MemberUpdateRequest(int gender) {
        this.gender = gender;
    }
}
