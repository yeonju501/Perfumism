package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;

public class PerfumeDetailResponse {

    @ApiModelProperty(example = "1")
    @JsonProperty("perfume_id")
    private Long id;

    @ApiModelProperty(example = "Sweet Tobacco Spirits")
    @JsonProperty("perfume_name")
    private String name;

    @JsonProperty("brand")
    private BrandResponse brand;

    @ApiModelProperty(example = "o.37691.jpg")
    @JsonProperty("image")
    private String image;

    @ApiModelProperty(example = "2016")
    @JsonProperty("launch_year")
    private Integer launchYear;

    @ApiModelProperty(example = "3.4")
    @JsonProperty("average_grade")
    private Double averageGrade;

    @ApiModelProperty(example = "Citruses")
    @JsonProperty("top_notes")
    private String topNotes;

    @ApiModelProperty(example = "Saffron")
    @JsonProperty("middle_notes")
    private String middleNotes;

    @ApiModelProperty(example = "Tonka Bean")
    @JsonProperty("base_notes")
    private String baseNotes;

    @ApiModelProperty(example = "126")
    @JsonProperty("total_survey")
    private Long totalSurvey;

    @ApiModelProperty(example = "moderate")
    @JsonProperty("longevity")
    private String longevity;

    @ApiModelProperty(example = "strong")
    @JsonProperty("sillage")
    private String sillage;

    @JsonProperty("accords")
    private List<AccordResponse> accordResponse;

    @JsonProperty("similar_perfume")
    private List<SimilarPerfumeResponse> similarPerfumeResponse;

    public PerfumeDetailResponse() {
    }

    public PerfumeDetailResponse(Long id, String name, BrandResponse brand, String image, Integer launchYear,
        Double averageGrade, String topNotes, String middleNotes, String baseNotes, Long totalSurvey, String longevity,
        String sillage, List<AccordResponse> accordResponse,
        List<SimilarPerfumeResponse> similarPerfumeResponse) {
        this.id = id;
        this.name = name;
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
        this.similarPerfumeResponse = similarPerfumeResponse;
    }

    public static PerfumeDetailResponse from(Perfume perfume, List<PerfumeAccord> perfumeAccords,
        List<SimilarPerfume> similarPerfumes) {
        return new PerfumeDetailResponse(
            perfume.getId(),
            perfume.getName(),
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
                .collect(Collectors.toList()),
            similarPerfumes.stream()
                .map(SimilarPerfumeResponse::from)
                .collect(Collectors.toList())
        );
    }
}
