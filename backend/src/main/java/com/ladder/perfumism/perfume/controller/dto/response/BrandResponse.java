package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Brand;

public class BrandResponse {

    @JsonProperty("brand_id")
    private Long brandId;

    @JsonProperty("name")
    private String name;

    public BrandResponse(Long brandId, String name) {
        this.brandId = brandId;
        this.name = name;
    }

    public static BrandResponse from(Brand brand) {
        return new BrandResponse(
            brand.getId(),
            brand.getName()
        );
    }
}
