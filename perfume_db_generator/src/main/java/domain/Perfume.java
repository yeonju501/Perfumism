package domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Perfume {

    private final Long perfumeId;

    private final Long brandId;

    private final String name;

    private final String image;

    private final Integer launchYear;

    private final Double averageGrade;

    private final String topNotes;

    private final String middleNotes;

    private final String baseNotes;

    private final Integer totalSurvey;

    private final String longevity;

    private final String sillage;

    @Builder
    private Perfume(Long perfumeId, Long brandId, String name, String image, Integer launchYear, Double averageGrade, String topNotes,
        String middleNotes, String baseNotes, Integer totalSurvey, String longevity, String sillage) {
        this.perfumeId = perfumeId;
        this.brandId = brandId;
        this.name = name;
        this.image = image;
        this.launchYear = launchYear;
        this.averageGrade = averageGrade;
        this.topNotes = topNotes;
        this.middleNotes = middleNotes;
        this.baseNotes = baseNotes;
        this.totalSurvey = totalSurvey;
        this.longevity = longevity;
        this.sillage = sillage;
    }

    public static Perfume toPerfume(Long perfumeId, Long brandId, String name, String image, Integer launchYear, Double averageGrade,
        String topNotes, String middleNotes, String baseNotes, Integer totalSurvey, String longevity, String sillage) {
        return Perfume.builder()
            .perfumeId(perfumeId)
            .brandId(brandId)
            .name(name)
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
