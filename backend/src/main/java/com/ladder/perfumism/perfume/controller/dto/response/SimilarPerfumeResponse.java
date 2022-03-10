package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;

public class SimilarPerfumeResponse {
    @JsonProperty("perfume_id")
    private Long perfumeId;

    @JsonProperty("perfume_name")
    private String perfumeName;

    @JsonProperty("brand_name")
    private String brandName;

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

    public static SimilarPerfumeResponse from(SimilarPerfume similarPerfume){
        return new SimilarPerfumeResponse(
            similarPerfume.getSimilarId().getId(),
            similarPerfume.getSimilarId().getName(),
            similarPerfume.getSimilarId().getBrandId().getName(),
            similarPerfume.getSimilarId().getImage()
        );
    }
}
