package com.ladder.perfumism.auth.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TokenResponse {

    @JsonProperty("access_token")
    @ApiModelProperty(position = 0, notes = "access token", example = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5ZW9uanVAbmF2ZXIuY29tMTEiLCJhdXRoIjoiQTAwIiwiaXNzIjoibGFkZGVyIiwiZXhwIjoxNjQ3MjQ5NTIyLCJpYXQiOjE2NDcyNDc3MjJ9.huloVc_rYaLo83V_aZSAFRvZtRPSFgG5H7fZn_DKwaVSW_aKdVO8cmPPQPqTcLgip7-_htWVJdsUaOPLqxj13Q")
    private String accessToken;

    @JsonProperty("refresh_token")
    @ApiModelProperty(position = 1, notes = "refresh token", example = "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NDc4NTI1MjN9.aMX4FK1a0nsbIXMQLNHfpL_VrFkyU39Suc_ihoXFoeWvlm8CbAo32RhO-Dncn9tHaMx9p7sfqzrbV3YseJgKiw")
    private String refreshToken;

    public TokenResponse() {
    }

    @Builder
    public TokenResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
