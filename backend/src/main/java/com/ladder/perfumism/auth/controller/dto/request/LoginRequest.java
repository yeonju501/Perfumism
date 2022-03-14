package com.ladder.perfumism.auth.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class LoginRequest {

    @JsonProperty("email")
    @ApiModelProperty(required = true, position = 0, notes = "이메일", example = "loling3@naver.com")
    private String email;

    @JsonProperty("password")
    @ApiModelProperty(required = true, position = 1, notes = "비밀번호", example = "dkjghdfkjhdkjh")
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
