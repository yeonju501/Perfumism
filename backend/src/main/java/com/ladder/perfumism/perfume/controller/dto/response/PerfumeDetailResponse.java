package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import java.util.List;
import java.util.stream.Collectors;

public class PerfumeDetailResponse {

    @JsonProperty("perfume_id")
    private Long id;

    @JsonProperty("brand")
    private BrandResponse brand;

    @JsonProperty("image")
    private String image;

    @JsonProperty("launch_year")
    private Integer launchYear;

    @JsonProperty("average_grade")
    private Double averageGrade;

    @JsonProperty("top_notes")
    private String topNotes;

    @JsonProperty("middle_notes")
    private String middleNotes;

    @JsonProperty("base_notes")
    private String baseNotes;

    @JsonProperty("total_survey")
    private Long totalSurvey;

    @JsonProperty("longevity")
    private String longevity;

    @JsonProperty("sillage")
    private String sillage;

    @JsonProperty("Accords")
    private List<AccordResponse> accordResponse;

    public PerfumeDetailResponse() {
    }

    public PerfumeDetailResponse(Long id, BrandResponse brand, String image, Integer launchYear, Double averageGrade,
        String topNotes, String middleNotes, String baseNotes, Long totalSurvey, String longevity, String sillage,
        List<AccordResponse> accordResponse) {
        this.id = id;
        this.brand = brand;
        this.image = image;
        this.launchYear = launchYear;
        this.averageGrade = averageGrade;
        this.topNotes = topNotes;
        this.middleNotes = middleNotes;
        this.baseNotes = baseNotes;
        this.totalSurvey = totalSurvey;
        this.longevity = longevity;
        this.sillage = sillage;
        this.accordResponse = accordResponse;
    }

    public static PerfumeDetailResponse from(Perfume perfume, List<PerfumeAccord> perfumeAccords) {
        return new PerfumeDetailResponse(
            perfume.getId(),
            BrandResponse.from(perfume.getBrandId()),
            perfume.getImage(),
            perfume.getLaunchYear(),
            perfume.getAverageGrade(),
            perfume.getTopNotes(),
            perfume.getMiddleNotes(),
            perfume.getBaseNotes(),
            perfume.getTotalSurvey(),
            perfume.getLongevity(),
            perfume.getSillage(),
            perfumeAccords.stream()
                .map(AccordResponse::from)
                .collect(Collectors.toList())
        );
    }
}
