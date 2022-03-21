package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.PerfumeLike;
import io.swagger.annotations.ApiModelProperty;

public class PerfumeSimpleResponse {

    @JsonProperty("perfume_id")
    @ApiModelProperty(position = 0, notes = "향수 id", example = "1")
    private Long id;

    @JsonProperty("perfume_name")
    @ApiModelProperty(position = 1, notes = "향수 이름", example = "Sweet Tobacco Spirits")
    private String name;

    @JsonProperty("image")
    @ApiModelProperty(position = 2, notes = "향수 이미지", example = "o.37691.jpg")
    private String image;

    @JsonProperty("average_grade")
    @ApiModelProperty(position = 3, notes = "평균 평점", example = "3.4")
    private Double averageGrade;

    @JsonProperty("likes")
    @ApiModelProperty(position = 4, notes = "좋아요 수", example = "222")
    private Integer likes;

    public PerfumeSimpleResponse() {
    }

    public PerfumeSimpleResponse(Long id, String name, String image, Double averageGrade, Integer likes) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.averageGrade = averageGrade;
        this.likes = likes;
    }

    public static PerfumeSimpleResponse from(PerfumeLike perfumeLike) {
        return new PerfumeSimpleResponse(
            perfumeLike.getPerfumeId().getId(),
            perfumeLike.getPerfumeId().getName(),
            perfumeLike.getPerfumeId().getImage(),
            perfumeLike.getPerfumeId().getAverageGrade(),
            perfumeLike.getPerfumeId().getTotalLike()
        );
    }
}
