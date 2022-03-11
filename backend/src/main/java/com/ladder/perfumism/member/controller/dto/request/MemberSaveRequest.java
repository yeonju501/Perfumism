package com.ladder.perfumism.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.member.domain.Member;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberSaveRequest {

    @ApiModelProperty(name = "email", position = 0, example = "loling3@naver.com")
    @JsonProperty("email")
    private String email;

    @ApiModelProperty(name = "password", position = 1, example = "dkjghdfkjhdkjh")
    @JsonProperty("password")
    private String password;

    @ApiModelProperty(name = "username", position = 2, example = "연주")
    @JsonProperty("username")
    private String username;

    public MemberSaveRequest() {
    }

    public MemberSaveRequest(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    public Member toMember() {
        return Member.createMember(email, password, username);
    }
}
