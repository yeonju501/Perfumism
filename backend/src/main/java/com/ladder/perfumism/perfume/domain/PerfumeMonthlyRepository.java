package com.ladder.perfumism.perfume.domain;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PerfumeMonthlyRepository extends JpaRepository<PerfumeMonthly, Long> {

    @Query(value = "select new PerfumeMonthly(pl.perfumeId, count(pl.perfumeId)) "
        + "from PerfumeLike pl "
        + "where pl.deletedAt is null "
        + "  and pl.createdAt between :startDate and :endDate "
        + "group by pl.perfumeId "
        + "order by count(pl.perfumeId) desc")
    List<PerfumeMonthly> CountLikePerfume(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate,
        Pageable pageable);

    @Modifying
    @Query(nativeQuery = true, value = "update perfume_monthly "
        + "set deleted_at = current_timestamp "
        + "where deleted_at is null")
    Integer updateDeletedAtAll();
}
