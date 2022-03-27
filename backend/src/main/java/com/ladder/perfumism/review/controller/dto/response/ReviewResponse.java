package com.ladder.perfumism.review.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.review.domain.Review;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;

public class ReviewResponse {

    @JsonProperty("review_id")
    @ApiModelProperty(position = 0, notes = "리뷰 ID", example = "1")
    private Long reviewId;

    @JsonProperty("member_id")
    @ApiModelProperty(position = 1, notes = "회원 고유 ID", example = "1")
    private Long memberId;

    @JsonProperty("member_name")
    @ApiModelProperty(position = 2, notes = "회원 이름", example = "이승기")
    private String memberName;

    @JsonProperty("member_image")
    @ApiModelProperty(position = 3, notes = "회원 프로필 사진", example = "eocnddlalwlvkdlfdlfma.jpg")
    private String memberImage;

    @JsonProperty("grade")
    @ApiModelProperty(position = 4, notes = "평점", example = "4")
    private Integer grade;

    @JsonProperty("content")
    @ApiModelProperty(position = 5, notes = "리뷰 내용", example = "이 향수는 마치 꽃이 무수하게 핀 들판의 공기를 그대로 가져온듯 한 향...")
    private String content;

    @JsonProperty("likes")
    @ApiModelProperty(position = 6, notes = "좋아요 수", example = "222")
    private Integer likes;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("created_at")
    @ApiModelProperty(position = 7, notes = "작성 날짜", example = "2022-03-24 13:04:08")
    private LocalDateTime createdAt;

    public ReviewResponse() {
    }

    public ReviewResponse(Long reviewId, Long memberId, String memberName, String memberImage, Integer grade,
        String content, Integer likes, LocalDateTime createdAt) {
        this.reviewId = reviewId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberImage = memberImage;
        this.grade = grade;
        this.content = content;
        this.likes = likes;
        this.createdAt = createdAt;
    }

    public static ReviewResponse from(Review review) {
        return new ReviewResponse(
            review.getId(),
            review.getMemberId().getId(),
            review.getMemberId().getUsername(),
            review.getMemberId().getImage(),
            review.getGrade(),
            review.getContent(),
            review.getTotalLike(),
            review.getCreatedAt()
        );
    }

}
