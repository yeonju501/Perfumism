package com.ladder.perfumism.review.domain;

import com.ladder.perfumism.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Long> {

    Boolean existsByMemberIdAndReviewId(Member member, Review review);

    Optional<ReviewLike> findByMemberIdAndReviewId(Member member, Review review);

    Integer countByReviewId(Review review);

    @Modifying
    @Query(value = "update ReviewLike rl "
        + "set rl.deletedAt = current_timestamp "
        + "where rl.reviewId = :review")
    Integer updateDeletedAtByReviewId(@Param("review") Review reviewId);
}
