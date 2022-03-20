package com.ladder.perfumism.review.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

public class ReviewLikeResponse {

    @JsonProperty("is_liked")
    @ApiModelProperty(position = 0, notes = "좋아요 상태")
    private Boolean isLiked;

    public ReviewLikeResponse() {
    }

    public ReviewLikeResponse(Boolean isLiked) {
        this.isLiked = isLiked;
    }

    public static ReviewLikeResponse from(Boolean isLiked){
        return new ReviewLikeResponse(isLiked);
    }
}
