package com.ladder.perfumism.auth.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;

public class AccessTokenResponse {

    @JsonProperty("access_token")
    @ApiModelProperty(notes = "access token", example = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5ZW9uanVAbmF2ZXIuY29tMTEiLCJhdXRoIjoiQTAwIiwiaXNzIjoibGFkZGVyIiwiZXhwIjoxNjQ3NjE2NDg3LCJpYXQiOjE2NDc2MTQ2ODd9.UTTVWbGmnzqLY0gJjYPNeZ3WAVK-lZnitJQ_Sg-gTnAlEpyA_6tGZNsT35hN0PbajZPzFyYcdGPFCbyOopyKIQ")
    private String accessToken;

    public AccessTokenResponse() {
    }

    @Builder
    public AccessTokenResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
