package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;
import io.swagger.annotations.ApiModelProperty;

public class SimilarPerfumeResponse {

    @JsonProperty("perfume_id")
    @ApiModelProperty(position = 0, notes = "향수 ID", example = "2")
    private Long perfumeId;

    @JsonProperty("perfume_name")
    @ApiModelProperty(position = 1, notes = "향수 이름", example = "2")
    private String perfumeName;

    @JsonProperty("brand_name")
    @ApiModelProperty(position = 2, notes = "브랜드 이름", example = "40 Notes Perfume")
    private String brandName;

    @JsonProperty("image")
    @ApiModelProperty(position = 3, notes = "향수 이미지", example = "o.15537.jpg")
    private String image;

    public SimilarPerfumeResponse() {
    }

    public SimilarPerfumeResponse(Long perfumeId, String perfumeName, String brandName, String image) {
        this.perfumeId = perfumeId;
        this.perfumeName = perfumeName;
        this.brandName = brandName;
        this.image = image;
    }

    public static SimilarPerfumeResponse from(SimilarPerfume similarPerfume) {
        return new SimilarPerfumeResponse(
            similarPerfume.getSimilarId().getId(),
            similarPerfume.getSimilarId().getName(),
            similarPerfume.getSimilarId().getBrandId().getName(),
            similarPerfume.getSimilarId().getImage()
        );
    }
}
