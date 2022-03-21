package com.ladder.perfumism.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

public class CodeResponse {

    @JsonProperty("code")
    @ApiModelProperty(notes = "인증 번호", example = "rDBpqeQSi6898Dle")
    private String code;

    public CodeResponse(String code) {
        this.code = code;
    }

    public static CodeResponse from(String code){
        return new CodeResponse(code);
    }
}
