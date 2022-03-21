package com.ladder.perfumism.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class FindPasswordRequest {

    @JsonProperty("email")
    @ApiModelProperty(name = "email", example = "loling3@naver.com")
    private String email;

    public FindPasswordRequest() {
    }

    public FindPasswordRequest(String email) {
        this.email = email;
    }
}
