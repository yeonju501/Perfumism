package com.ladder.perfumism.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.member.domain.Member;
import lombok.Getter;

@Getter
public class MemberSaveRequest {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("username")
    private String username;

    public MemberSaveRequest() {
    }

    public MemberSaveRequest(String email, String password, String username){
        this.email = email;
        this.password = password;
        this.username = username;
    }

    public Member toMember() {
        return Member.createMember(email, password, username);
    }

}
