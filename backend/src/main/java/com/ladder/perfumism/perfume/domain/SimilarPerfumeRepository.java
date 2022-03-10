package com.ladder.perfumism.perfume.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimilarPerfumeRepository extends JpaRepository<SimilarPerfume, Long> {

    List<SimilarPerfume> findByOriginId(Perfume perfume);
}
