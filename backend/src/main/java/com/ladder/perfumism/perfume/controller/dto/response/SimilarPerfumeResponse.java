package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;
import io.swagger.annotations.ApiModelProperty;

public class SimilarPerfumeResponse {

    @ApiModelProperty(example = "2")
    @JsonProperty("perfume_id")
    private Long perfumeId;

    @ApiModelProperty(example = "2")
    @JsonProperty("perfume_name")
    private String perfumeName;

    @ApiModelProperty(example = "40 Notes Perfume")
    @JsonProperty("brand_name")
    private String brandName;

    @ApiModelProperty(example = "o.15537.jpg")
    @JsonProperty("image")
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
