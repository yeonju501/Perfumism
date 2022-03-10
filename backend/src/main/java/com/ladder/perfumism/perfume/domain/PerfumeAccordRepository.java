package com.ladder.perfumism.perfume.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfumeAccordRepository extends JpaRepository<PerfumeAccord, Long> {

    List<PerfumeAccord> findByPerfume(Perfume perfume);
}
