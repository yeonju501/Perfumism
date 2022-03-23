package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Brand;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class BrandListResponse {

    @JsonProperty("brands")
    @ApiModelProperty(notes = "브랜드 리스트")
    private List<BrandResponse> brandResponses;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "전체 페이지", example = "2")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "현재 페이지", example = "0")
    private int currentPageCount;

    public BrandListResponse() {
    }

    public BrandListResponse(List<BrandResponse> brandResponses, int totalPageCount, int currentPageCount) {
        this.brandResponses = brandResponses;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static BrandListResponse from(Page<Brand> brands) {
        return new BrandListResponse(
            brands.stream()
                .map(BrandResponse::from)
                .collect(Collectors.toList()),
            brands.getTotalPages(),
            brands.getNumber()
        );
    }
}
