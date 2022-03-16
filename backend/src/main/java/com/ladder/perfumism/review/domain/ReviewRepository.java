package com.ladder.perfumism.review.domain;

import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.perfume.domain.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByPerfumeId(Perfume perfume, Pageable pageable);

    Boolean existsByMemberIdAndPerfumeId(Member member, Perfume perfume);
}
