package com.ladder.perfumism.perfume.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.member.domain.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class PerfumeLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_like_id")
    private Long id;

    @ManyToOne(targetEntity = Perfume.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "perfume_id")
    private Perfume perfumeId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    public PerfumeLike() {
    }

    public PerfumeLike(Long id, Perfume perfumeId, Member memberId) {
        this.id = id;
        this.perfumeId = perfumeId;
        this.memberId = memberId;
    }

    @Builder
    public PerfumeLike(Perfume perfumeId, Member memberId) {
        this.perfumeId = perfumeId;
        this.memberId = memberId;
    }

    public static PerfumeLike createPerfumeLike(Perfume perfume, Member member) {
        return PerfumeLike.builder()
            .perfumeId(perfume)
            .memberId(member)
            .build();
    }
}
