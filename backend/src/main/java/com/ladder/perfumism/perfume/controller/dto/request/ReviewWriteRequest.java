package com.ladder.perfumism.perfume.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ReviewWriteRequest {

    @JsonProperty("grade")
    @ApiModelProperty(required = true, position = 0, notes = "평점", example = "1~5")
    private Integer grade;

    @JsonProperty("content")
    @ApiModelProperty(required = true, position = 1, notes = "리뷰 내용", example = "이 향수는 마치 사막 한가운데에 핀 꽃이 내는 향기를 담고 있...")
    private String content;

    protected ReviewWriteRequest() {
    }

    public ReviewWriteRequest(Integer grade, String content) {
        this.grade = grade;
        this.content = content;
    }
}
