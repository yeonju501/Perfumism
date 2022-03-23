package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeLike;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class PerfumeListResponse {

    @JsonProperty("perfumes")
    @ApiModelProperty(notes = "향수 리스트")
    private List<PerfumeSimpleResponse> perfumeSimpleResponses;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "전체 페이지", example = "2")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "현재 페이지", example = "0")
    private int currentPageCount;

    public PerfumeListResponse() {
    }

    public PerfumeListResponse(
        List<PerfumeSimpleResponse> perfumeSimpleResponses, int totalPageCount, int currentPageCount) {
        this.perfumeSimpleResponses = perfumeSimpleResponses;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static PerfumeListResponse fromLikes(Page<PerfumeLike> perfumes) {
        return new PerfumeListResponse(
            perfumes.stream()
                .map(PerfumeSimpleResponse::from)
                .collect(Collectors.toList()),
            perfumes.getTotalPages(),
            perfumes.getNumber()
        );
    }

    public static PerfumeListResponse from(Page<Perfume> perfumes) {
        return new PerfumeListResponse(
            perfumes.stream()
                .map(PerfumeSimpleResponse::from)
                .collect(Collectors.toList()),
            perfumes.getTotalPages(),
            perfumes.getNumber()
        );
    }
}
