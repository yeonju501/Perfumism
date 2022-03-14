package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Review;

public class ReviewResponse {

    @JsonProperty("review_id")
    private Long reviewId;

    @JsonProperty("member_id")
    private Long memberId;

    @JsonProperty("member_name")
    private String memberName;

    @JsonProperty("member_image")
    private String memberImage;

    @JsonProperty("grade")
    private Integer grade;

    @JsonProperty("content")
    private String content;

    public ReviewResponse() {
    }

    public ReviewResponse(Long reviewId, Long memberId, String memberName, String memberImage, Integer grade,
        String content) {
        this.reviewId = reviewId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberImage = memberImage;
        this.grade = grade;
        this.content = content;
    }

    public static ReviewResponse from(Review review) {
        return new ReviewResponse(
            review.getId(),
            review.getMemberId().getId(),
            review.getMemberId().getUsername(),
            review.getMemberId().getImage(),
            review.getGrade(),
            review.getContent()
        );
    }

}
