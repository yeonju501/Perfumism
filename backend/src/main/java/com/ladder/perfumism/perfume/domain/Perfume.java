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

    public Perfume() {
    }

    @Builder
    public Perfume(Long id, String name, Brand brandId, String image, Integer launchYear, Double averageGrade,
        String topNotes, String middleNotes, String baseNotes, Long totalSurvey, String longevity, String sillage) {
        this.id = id;
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
    }
}
