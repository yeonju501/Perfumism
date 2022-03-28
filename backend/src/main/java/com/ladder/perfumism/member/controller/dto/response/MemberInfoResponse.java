package com.ladder.perfumism.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.member.domain.Member;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.models.auth.In;
import lombok.Getter;

@Getter
public class MemberInfoResponse {

    @JsonProperty("email")
    @ApiModelProperty(notes = "이메일", example = "loling3@naver.com")
    private String email;

    @JsonProperty("username")
    @ApiModelProperty(notes = "유저네임", example = "yeonju")
    private String username;

    @JsonProperty("gender")
    @ApiModelProperty(notes = "성별", example = "0")
    private Integer gender;

    @JsonProperty("image")
    @ApiModelProperty(notes = "이미지", example = "https://perfumism-bucket.s3.ap-northeast-2.amazonaws.com/profile/6a198024-d097-42a0-8b1a-e70b1684e1e5springboot.png")
    private String image;

    @JsonProperty("social_id")
    @ApiModelProperty(notes = "소셜 아이디 (소셜 확인용)", example = "")
    private String socialId;

    public MemberInfoResponse(String email, String username, Integer gender, String image, String socialId) {
        this.email = email;
        this.username = username;
        this.image = image;
        this.socialId = socialId;
    }

    public static MemberInfoResponse from(Member member) {
        return new MemberInfoResponse(
            member.getEmail(),
            member.getUsername(),
            member.getGender(),
            member.getImage(),
            member.getKakaoId()
        );
    }

}
