package com.ladder.perfumism.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberUpdateRequest {

    @ApiModelProperty(name = "password", example = "sksmsWkddlek1!")
    @JsonProperty("password")
    private String password;

    @ApiModelProperty(name = "username", position = 1, example = "연주")
    @JsonProperty("username")
    private String username;

    public MemberUpdateRequest() {
    }

    public MemberUpdateRequest(String password, String username) {
        this.password = password;
        this.username = username;
    }
}
