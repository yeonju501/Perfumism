package com.ladder.perfumism.review.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.review.domain.Review;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;

public class ReviewLatestResponse {

    @JsonProperty("review_id")
    @ApiModelProperty(position = 0, notes = "리뷰 ID", example = "1")
    private Long reviewId;

    @JsonProperty("perfume_id")
    @ApiModelProperty(position = 1, notes = "향수 ID", example = "234")
    private Long perfumeId;

    @JsonProperty("perfume_name")
    @ApiModelProperty(position = 2, notes = "향수 이름", example = "Magic Mushroom")
    private String perfumeName;

    @JsonProperty("perfume_image")
    @ApiModelProperty(position = 3, notes = "향수 이미지", example = "image.jpg")
    private String perfumeImage;

    @JsonProperty("member_id")
    @ApiModelProperty(position = 4, notes = "회원 고유 ID", example = "1")
    private Long memberId;

    @JsonProperty("member_name")
    @ApiModelProperty(position = 5, notes = "회원 이름", example = "이승기")
    private String memberName;

    @JsonProperty("member_image")
    @ApiModelProperty(position = 6, notes = "회원 프로필 사진", example = "eocnddlalwlvkdlfdlfma.jpg")
    private String memberImage;

    @JsonProperty("grade")
    @ApiModelProperty(position = 7, notes = "평점", example = "4")
    private Integer grade;

    @JsonProperty("content")
    @ApiModelProperty(position = 8, notes = "리뷰 내용", example = "이 향수는 마치 꽃이 무수하게 핀 들판의 공기를 그대로 가져온듯 한 향...")
    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("created_at")
    @ApiModelProperty(position = 9, notes = "작성 날짜", example = "2022-03-24 13:04:08")
    private LocalDateTime createdAt;

    public ReviewLatestResponse() {
    }

    public ReviewLatestResponse(Long reviewId, Long perfumeId, String perfumeName, String perfumeImage, Long memberId,
        String memberName, String memberImage, Integer grade, String content, LocalDateTime createdAt) {
        this.reviewId = reviewId;
        this.perfumeId = perfumeId;
        this.perfumeName = perfumeName;
        this.perfumeImage = perfumeImage;
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberImage = memberImage;
        this.grade = grade;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static ReviewLatestResponse from(Review review) {
        return new ReviewLatestResponse(
            review.getId(),
            review.getPerfumeId().getId(),
            review.getPerfumeId().getName(),
            review.getPerfumeId().getImage(),
            review.getMemberId().getId(),
            review.getMemberId().getUsername(),
            review.getMemberId().getImage(),
            review.getGrade(),
            review.getContent(),
            review.getCreatedAt()
        );
    }
}
