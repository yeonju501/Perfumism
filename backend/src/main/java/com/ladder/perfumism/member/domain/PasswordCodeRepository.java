package com.ladder.perfumism.member.domain;

import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordCodeRepository extends JpaRepository<PasswordCode, String> {
    boolean existsByIdAndExpirationDateAfterAndExpiredIsFalse(String code, LocalDateTime now);
}
