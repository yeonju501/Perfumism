package com.ladder.perfumism.review.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.review.domain.Review;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class ReviewPageResponse {

    @JsonProperty("reviews")
    @ApiModelProperty(position = 0, notes = "리뷰 리스트")
    private List<ReviewResponse> reviewResponses;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "전체 페이지", example = "2")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "현재 페이지", example = "0")
    private int currentPageCount;

    public ReviewPageResponse() {
    }

    public ReviewPageResponse(List<ReviewResponse> reviewResponses, int totalPageCount, int currentPageCount) {
        this.reviewResponses = reviewResponses;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ReviewPageResponse from(Page<Review> reviews){
        return new ReviewPageResponse(
            reviews.stream()
                .map(ReviewResponse::from)
                .collect(Collectors.toList()),
            reviews.getTotalPages(),
            reviews.getNumber()
        );
    }
}
