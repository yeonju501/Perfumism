package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Brand;
import io.swagger.annotations.ApiModelProperty;

public class BrandResponse {

    @ApiModelProperty(example = "0")
    @JsonProperty("brand_id")
    private Long brandId;

    @ApiModelProperty(example = "18 21 Man Made")
    @JsonProperty("brand_name")
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
