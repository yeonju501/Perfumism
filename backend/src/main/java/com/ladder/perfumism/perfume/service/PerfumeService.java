package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.PerfumeAccordRepository;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;
import com.ladder.perfumism.perfume.domain.SimilarPerfumeRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeAccordRepository perfumeAccordRepository;
    private final SimilarPerfumeRepository similarPerfumeRepository;

    public PerfumeService(PerfumeRepository perfumeRepository,
        PerfumeAccordRepository perfumeAccordRepository,
        SimilarPerfumeRepository similarPerfumeRepository) {
        this.perfumeRepository = perfumeRepository;
        this.perfumeAccordRepository = perfumeAccordRepository;
        this.similarPerfumeRepository = similarPerfumeRepository;
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
    public PerfumeListResponse normalPerfumeList(Pageable pageable) {
        Page<Perfume> perfumeList = perfumeRepository.findAll(pageable);

        return PerfumeListResponse.from(perfumeList);
    }
}
