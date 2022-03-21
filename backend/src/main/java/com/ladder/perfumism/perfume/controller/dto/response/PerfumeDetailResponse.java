package com.ladder.perfumism.perfume.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class PerfumeDetailResponse {

    @JsonProperty("perfume_id")
    @ApiModelProperty(position = 0, notes = "향수 id", example = "1")
    private Long id;

    @JsonProperty("perfume_name")
    @ApiModelProperty(position = 1, notes = "향수 이름", example = "Sweet Tobacco Spirits")
    private String name;

    @JsonProperty("brand")
    @ApiModelProperty(position = 2, notes = "브랜드 정보")
    private BrandResponse brand;

    @JsonProperty("image")
    @ApiModelProperty(position = 3, notes = "향수 이미지", example = "o.37691.jpg")
    private String image;

    @JsonProperty("launch_year")
    @ApiModelProperty(position = 4, notes = "출시년도", example = "2016")
    private Integer launchYear;

    @JsonProperty("average_grade")
    @ApiModelProperty(position = 5, notes = "평균 평점", example = "3.4")
    private Double averageGrade;

    @JsonProperty("top_notes")
    @ApiModelProperty(position = 6, notes = "탑 노트", example = "Citruses")
    private String topNotes;

    @JsonProperty("middle_notes")
    @ApiModelProperty(position = 7, notes = "미들 노트", example = "Saffron")
    private String middleNotes;

    @JsonProperty("base_notes")
    @ApiModelProperty(position = 8, notes = "베이스 노트", example = "Tonka Bean")
    private String baseNotes;

    @JsonProperty("total_survey")
    @ApiModelProperty(position = 9, notes = "설문자 수", example = "126")
    private Long totalSurvey;

    @JsonProperty("longevity")
    @ApiModelProperty(position = 10, notes = "지속력", example = "moderate")
    private String longevity;

    @JsonProperty("sillage")
    @ApiModelProperty(position = 11, notes = "시야주", example = "strong")
    private String sillage;

    @JsonProperty("accords")
    @ApiModelProperty(position = 12, notes = "향 특징 정보")
    private List<AccordResponse> accordResponse;

    @JsonProperty("similar_perfume")
    @ApiModelProperty(position = 13, notes = "비슷한 향수 정보")
    private List<SimilarPerfumeResponse> similarPerfumeResponse;

    @JsonProperty("likes")
    @ApiModelProperty(position = 14, notes = "좋아요 수", example = "222")
    private Integer likes;

    public PerfumeDetailResponse() {
    }

    public PerfumeDetailResponse(Long id, String name, BrandResponse brand, String image, Integer launchYear,
        Double averageGrade, String topNotes, String middleNotes, String baseNotes, Long totalSurvey, String longevity,
        String sillage, List<AccordResponse> accordResponse,
        List<SimilarPerfumeResponse> similarPerfumeResponse, Integer likes) {
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
        this.likes = likes;
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
                .collect(Collectors.toList()),
            perfume.getTotalLike()
        );
    }
}
