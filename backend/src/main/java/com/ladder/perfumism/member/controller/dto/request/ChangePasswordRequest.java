package com.ladder.perfumism.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ChangePasswordRequest {

    @JsonProperty("email")
    @ApiModelProperty(name = "email", example = "loling3@naver.com")
    private String email;

    @JsonProperty("password")
    @ApiModelProperty(name = "password", example = "vkdlxld1234!")
    private String password;

    public ChangePasswordRequest(){
    }

    public ChangePasswordRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
