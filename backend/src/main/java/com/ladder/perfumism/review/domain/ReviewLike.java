package com.ladder.perfumism.review.domain;

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

@Getter
@Entity
@Where(clause = "deleted_at is null")
public class ReviewLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_like_id")
    private Long id;

    @ManyToOne(targetEntity = Review.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review reviewId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    public ReviewLike() {
    }

    @Builder
    public ReviewLike(Review reviewId, Member memberId) {
        this.reviewId = reviewId;
        this.memberId = memberId;
    }


    public static ReviewLike createReviewLike(Review review, Member member) {
        return ReviewLike.builder()
            .reviewId(review)
            .memberId(member)
            .build();
    }
}
