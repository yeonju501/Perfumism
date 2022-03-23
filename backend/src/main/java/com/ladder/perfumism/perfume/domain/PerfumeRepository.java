package com.ladder.perfumism.perfume.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    Page<Perfume> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
