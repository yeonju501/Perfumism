package com.ladder.perfumism.auth.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.member.domain.Member;
import lombok.Getter;

@Getter
public class GoogleUserInfoResponse {

    @JsonProperty("email")
    private String email;

    @JsonProperty("name")
    private String name;

    @JsonProperty("picture")
    private String picture;

    @JsonProperty("sub")
    private String sub;

    @JsonProperty("exp")
    private String exp;

    public Member toEntity() {
        return Member.builder()
            .kakaoId(sub)
            .email(email)
            .username(name)
            .password(sub+exp)
            .authority(Authority.ROLE_MEMBER)
            .build();
    }
}
