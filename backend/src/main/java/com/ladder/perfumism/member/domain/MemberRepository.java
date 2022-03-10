package com.ladder.perfumism.member.domain;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<Member> findByEmail(String email);
}
