package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import io.swagger.annotations.ApiModelProperty;

public class AccordResponse {

    @JsonProperty("accord_id")
    @ApiModelProperty(position = 0, notes = "향 특징 id", example = "1")
    private Long accordId;

    @JsonProperty("kor_name")
    @ApiModelProperty(position = 1, notes = "한글 이름", example = "보드카")
    private String korName;

    @JsonProperty("eng_name")
    @ApiModelProperty(position = 2, notes = "영어 이름", example = "vodka")
    private String engName;

    public AccordResponse() {
    }

    public AccordResponse(Long accordId, String korName, String engName) {
        this.accordId = accordId;
        this.korName = korName;
        this.engName = engName;
    }

    public static AccordResponse from(PerfumeAccord perfumeAccord) {
        return new AccordResponse(
            perfumeAccord.getAccordId().getId(),
            perfumeAccord.getAccordId().getKorName(),
            perfumeAccord.getAccordId().getEngName()
        );
    }
}
