package com.ladder.perfumism.perfume.util;

import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.Perfume;

public class PerfumeFixture {

    public static final Long PERFUME_ID = 1L;
    public static final String PERFUME_NAME = "Sweet Tobacco Spirits";
    public static final Long BRAND_ID = 1L;
    public static final String IMAGE = "o.37691.jpg";
    public static final Integer LAUNCH_YEAR = 2020;
    public static final Double AVERAGE_GRADE = 3.4;
    public static final String TOP_NOTES = "Citruses";
    public static final String MIDDLE_NOTES = "Saffron";
    public static final String BASE_NOTES = "Tonka Bean";
    public static final Long TOTAL_SURVEY = 126L;
    public static final String LONGEVITY = "moderate";
    public static final String SILLAGE = "strong";

    public static Perfume createPerfume(Long id, String name, Brand brandId, String image, Integer launchYear,
        Double averageGrade, String topNotes, String middleNotes, String baseNotes, Long totalSurvey, String longevity,
        String sillage) {
        return Perfume.builder()
            .id(id)
            .name(name)
            .brandId(brandId)
            .image(image)
            .launchYear(launchYear)
            .averageGrade(averageGrade)
            .topNotes(topNotes)
            .middleNotes(middleNotes)
            .baseNotes(baseNotes)
            .totalSurvey(totalSurvey)
            .longevity(longevity)
            .sillage(sillage)
            .build();
    }
}
