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
public class SimilarPerfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "similar_perfume_id")
    private Long id;

    @ManyToOne(targetEntity = Perfume.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "origin_id")
    private Perfume originId;

    @ManyToOne(targetEntity = Perfume.class)
    @JoinColumn(name = "similar_id")
    private Perfume similarId;

    public SimilarPerfume() {
    }
}
