package com.ladder.perfumism.perfume.domain;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccordRepository extends JpaRepository<Accord, Long> {

    Optional<Accord> findByEngNameIgnoreCaseOrKorName(String EngName, String KorName);

}