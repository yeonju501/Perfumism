package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Review;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class ReviewPageResponse {

    @JsonProperty("reviews")
    private List<ReviewResponse> reviewResponses;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
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
