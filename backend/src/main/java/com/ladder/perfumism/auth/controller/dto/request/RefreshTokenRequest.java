package com.ladder.perfumism.auth.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class RefreshTokenRequest {

    @JsonProperty("refresh_token")
    @ApiModelProperty(notes = "refresh token", example = "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NDgyMTk0ODh9.BfUvX5JM9ZCtnVa-dViwv3ofOEol5PB5znrm-7O2-8cu9rSVXUM4MLdQ5ZEAlpSb-AWbwzDAdQkSJ_Fq-d3b6g")
    private String refreshToken;

    public RefreshTokenRequest(){
    }

    public RefreshTokenRequest(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
