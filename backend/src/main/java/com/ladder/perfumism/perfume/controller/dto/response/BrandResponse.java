package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Brand;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class BrandResponse {

    @JsonProperty("brand_id")
    @ApiModelProperty(position = 0, notes = "브랜드 id", example = "0")
    private Long brandId;

    @JsonProperty("brand_name")
    @ApiModelProperty(position = 1, notes = "브랜드 이름", example = "18 21 Man Made")
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
