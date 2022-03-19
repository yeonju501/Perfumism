package com.ladder.perfumism.review.domain;

import com.ladder.perfumism.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Long> {

    Boolean existsByMemberIdAndReviewId(Member member, Review review);

    Integer countByReviewId(Review review);
}
