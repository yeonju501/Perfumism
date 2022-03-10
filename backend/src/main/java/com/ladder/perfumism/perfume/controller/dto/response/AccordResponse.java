package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;

public class AccordResponse {
    @JsonProperty("accord_id")
    private Long accordId;

    @JsonProperty("kor_name")
    private String korName;

    @JsonProperty("eng_name")
    private String engName;

    public AccordResponse() {
    }

    public AccordResponse(Long accordId, String korName, String engName) {
        this.accordId = accordId;
        this.korName = korName;
        this.engName = engName;
    }

    public static AccordResponse from(PerfumeAccord perfumeAccord){
        return new AccordResponse(
            perfumeAccord.getId(),
            perfumeAccord.getAccordId().getKorName(),
            perfumeAccord.getAccordId().getEngName()
        );
    }
}
