package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import io.swagger.annotations.ApiModelProperty;

public class AccordResponse {

    @ApiModelProperty(example = "1")
    @JsonProperty("accord_id")
    private Long accordId;

    @ApiModelProperty(example = "보드카")
    @JsonProperty("kor_name")
    private String korName;

    @ApiModelProperty(example = "vodka")
    @JsonProperty("eng_name")
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
