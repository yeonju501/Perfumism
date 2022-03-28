package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.perfume.controller.dto.response.BrandListResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeSimpleResponse;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.BrandRepository;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.PerfumeAccordRepository;
import com.ladder.perfumism.perfume.domain.PerfumeMonthly;
import com.ladder.perfumism.perfume.domain.PerfumeMonthlyRepository;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;
import com.ladder.perfumism.perfume.domain.SimilarPerfumeRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeAccordRepository perfumeAccordRepository;
    private final SimilarPerfumeRepository similarPerfumeRepository;
    private final BrandRepository brandRepository;
    private final PerfumeMonthlyRepository perfumeMonthlyRepository;

    public PerfumeService(PerfumeRepository perfumeRepository,
        PerfumeAccordRepository perfumeAccordRepository,
        SimilarPerfumeRepository similarPerfumeRepository, BrandRepository brandRepository,
        PerfumeMonthlyRepository perfumeMonthlyRepository) {
        this.perfumeRepository = perfumeRepository;
        this.perfumeAccordRepository = perfumeAccordRepository;
        this.similarPerfumeRepository = similarPerfumeRepository;
        this.brandRepository = brandRepository;
        this.perfumeMonthlyRepository = perfumeMonthlyRepository;
    }

    @Transactional(readOnly = true)
    public PerfumeDetailResponse viewDetailPerfume(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        List<PerfumeAccord> perfumeAccords = perfumeAccordRepository.findByPerfumeId(perfume);

        List<SimilarPerfume> similarPerfumes = similarPerfumeRepository.findByOriginId(perfume);

        return PerfumeDetailResponse.from(perfume, perfumeAccords, similarPerfumes);
    }

    @Transactional(readOnly = true)
    public PerfumeListResponse getPerfumeList(Pageable pageable) {
        Page<Perfume> perfumeList = perfumeRepository.findAll(pageable);

        return PerfumeListResponse.from(perfumeList);
    }

    @Transactional(readOnly = true)
    public BrandListResponse getBrandList(Pageable pageable) {
        Page<Brand> brandList = brandRepository.findAll(pageable);

        return BrandListResponse.from(brandList);
    }

    @Transactional(readOnly = true)
    public Perfume findById(Long perfumeId) {
        return perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));
    }

    @Transactional
    public void refreshingMonthlyPerfumeList() {
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now().minusMonths(1), LocalTime.of(0, 0, 0));
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        List<PerfumeMonthly> monthlies = perfumeMonthlyRepository.CountLikePerfume(startDatetime, endDatetime,
            PageRequest.of(0, 3));

        perfumeMonthlyRepository.updateDeletedAtAll();
        perfumeMonthlyRepository.saveAll(monthlies);
    }

    @Transactional(readOnly = true)
    public List<PerfumeSimpleResponse> getMonthlyPerfumeList() {
        List<PerfumeMonthly> perfumeMonthlyList = perfumeMonthlyRepository.findAll();

        return perfumeMonthlyList.stream()
            .map(PerfumeSimpleResponse::from)
            .collect(Collectors.toList());
    }
}
