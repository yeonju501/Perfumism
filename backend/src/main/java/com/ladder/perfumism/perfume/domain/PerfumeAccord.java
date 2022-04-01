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
public class PerfumeAccord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_accord_id")
    private Long id;

    @ManyToOne(targetEntity = Accord.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "accord_id")
    private Accord accordId;

    @ManyToOne(targetEntity = Perfume.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "perfume_id")
    private Perfume perfumeId;

    public PerfumeAccord() {
    }

    public PerfumeAccord(Long id, Accord accordId, Perfume perfumeId) {
        this.id = id;
        this.accordId = accordId;
        this.perfumeId = perfumeId;
    }
}
