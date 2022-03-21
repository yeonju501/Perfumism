package com.ladder.perfumism.perfume.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(targetEntity = Brand.class)
    @JoinColumn(name = "brand_id")
    private Brand brandId;

    @Column(name = "image")
    private String image;

    @Column(name = "launch_year")
    private Integer launchYear;

    @Column(name = "average_grade")
    private Double averageGrade;

    @Column(name = "top_notes")
    private String topNotes;

    @Column(name = "middle_notes")
    private String middleNotes;

    @Column(name = "base_notes")
    private String baseNotes;

    @Column(name = "total_survey")
    private Long totalSurvey;

    @Column(name = "longevity")
    private String longevity;

    @Column(name = "sillage")
    private String sillage;

    @Column(name = "total_like")
    private Integer totalLike;

    public Perfume() {
    }

    @Builder
    public Perfume(String name, Brand brandId, String image, Integer launchYear, Double averageGrade, String topNotes,
        String middleNotes, String baseNotes, Long totalSurvey, String longevity, String sillage, Integer totalLike) {
        this.name = name;
        this.brandId = brandId;
        this.image = image;
        this.launchYear = launchYear;
        this.averageGrade = averageGrade;
        this.topNotes = topNotes;
        this.middleNotes = middleNotes;
        this.baseNotes = baseNotes;
        this.totalSurvey = totalSurvey;
        this.longevity = longevity;
        this.sillage = sillage;
        this.totalLike = totalLike;
    }

    public void increaseTotalSurvey() {
        this.totalSurvey++;
    }

    public void decreaseTotalSurvey() {
        this.totalSurvey--;
    }

    public void saveGrade(Double avgGrade) {
        this.averageGrade = avgGrade;
    }

    public void saveLike(Integer totalLike) {
        this.totalLike = totalLike;
    }
}
