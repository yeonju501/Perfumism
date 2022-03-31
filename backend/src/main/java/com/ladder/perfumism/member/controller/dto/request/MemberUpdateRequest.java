package com.ladder.perfumism.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberUpdateRequest {

    @ApiModelProperty(name = "유저네임", example = "연주")
    private String username;

    @ApiModelProperty(name = "성별", example = "1")
    @JsonProperty("gender")
    private Integer gender;

    public MemberUpdateRequest() {
    }

    public MemberUpdateRequest(String username, Integer gender) {
        this.username = username;
        this.gender = gender;
    }
}
