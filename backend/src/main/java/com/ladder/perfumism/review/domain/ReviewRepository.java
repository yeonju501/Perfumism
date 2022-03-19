package com.ladder.perfumism.review.domain;

import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.perfume.domain.Perfume;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByPerfumeId(Perfume perfume, Pageable pageable);

    Page<Review> findByMemberId(Member member, Pageable pageable);

    Optional<Review> findByMemberIdAndPerfumeId(Member member, Perfume perfume);

    Boolean existsByMemberIdAndPerfumeId(Member member, Perfume perfume);

    @Query(nativeQuery = true, value = "select avg(cast(r.grade as float)) from Review r "
        + "where r.perfume_id in (:ids) "
        + "and r.deleted_at is null "
        + "and r.grade > 0")
    Double avgGradeByPerfumeId(@Param("ids") Long perfumeId);
}
