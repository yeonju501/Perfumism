package com.ladder.perfumism.perfume.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_id")
    private Long id;

    @ManyToOne(targetEntity = Brand.class, fetch = FetchType.LAZY)
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
}
