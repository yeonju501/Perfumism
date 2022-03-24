package com.ladder.perfumism.perfume.domain;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    Page<Perfume> findByNameContainsIgnoreCase(String keyword, Pageable pageable);

    @Query(value = "select p from Perfume p where p.brandId in (:brands)")
    Page<Perfume> findByBrandId(@Param("brands") List<Brand> brands, Pageable pageable);

    @Query(value = "select p from Perfume p join PerfumeAccord a on a.perfumeId = p where a.accordId = :accordId")
    Page<Perfume> findByAccordId(Accord accordId, Pageable pageable);
}
