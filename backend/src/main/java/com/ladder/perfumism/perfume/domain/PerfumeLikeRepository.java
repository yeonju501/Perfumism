package com.ladder.perfumism.perfume.domain;

import com.ladder.perfumism.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfumeLikeRepository extends JpaRepository<PerfumeLike, Long> {

    Boolean existsByMemberIdAndPerfumeId(Member member, Perfume perfume);

    Integer countByPerfumeId(Perfume perfume);

    Optional<PerfumeLike> findByPerfumeIdAndMemberId(Perfume perfume, Member member);
}
