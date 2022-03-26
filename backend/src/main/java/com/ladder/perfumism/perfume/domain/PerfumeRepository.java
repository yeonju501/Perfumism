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

    @Query(value = "select p from Perfume p where p.id in "
        + "(select a.perfumeId from PerfumeAccord a where a.accordId = :accordId)")
    Page<Perfume> findByAccordId(Accord accordId, Pageable pageable);

    @Query(value = "select p from Perfume p "
        + "where lower(p.name) like lower(concat('%', :keyword, '%')) "
        + "or p.id in (select pa.perfumeId from PerfumeAccord pa where pa.accordId = ("
        + "select a from Accord a where lower(a.engName) = lower(:keyword) or a.korName = :keyword)) "
        + "or p.brandId in (select b.id from Brand b where lower(b.name) like lower(concat(:keyword,'%')))")
    Page<Perfume> searchAll(@Param("keyword") String Keyword, Pageable pageable);
}
