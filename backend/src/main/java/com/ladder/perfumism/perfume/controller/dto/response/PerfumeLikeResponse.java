package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class PerfumeLikeResponse {

    @JsonProperty("is_liked")
    @ApiModelProperty(position = 0, notes = "좋아요 상태")
    private Boolean isLiked;

    public PerfumeLikeResponse() {
    }

    public PerfumeLikeResponse(Boolean isLiked) {
        this.isLiked = isLiked;
    }

    public static PerfumeLikeResponse from(Boolean isLiked) {
        return new PerfumeLikeResponse(isLiked);
    }
}
