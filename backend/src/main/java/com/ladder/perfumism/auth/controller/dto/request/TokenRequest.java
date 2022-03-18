package com.ladder.perfumism.auth.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class TokenRequest {

    @JsonProperty("access_token")
    @ApiModelProperty(notes = "access token", example = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5ZW9uanVAbmF2ZXIuY29tMTEiLCJhdXRoIjoiQTAwIiwiaXNzIjoibGFkZGVyIiwiZXhwIjoxNjQ3NjE2NDg3LCJpYXQiOjE2NDc2MTQ2ODd9.UTTVWbGmnzqLY0gJjYPNeZ3WAVK-lZnitJQ_Sg-gTnAlEpyA_6tGZNsT35hN0PbajZPzFyYcdGPFCbyOopyKIQ")
    private String accessToken;

    @JsonProperty("refresh_token")
    @ApiModelProperty(notes = "refresh token", example = "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NDgyMTk0ODh9.BfUvX5JM9ZCtnVa-dViwv3ofOEol5PB5znrm-7O2-8cu9rSVXUM4MLdQ5ZEAlpSb-AWbwzDAdQkSJ_Fq-d3b6g")
    private String refreshToken;

    public TokenRequest() {
    }

    public TokenRequest(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
