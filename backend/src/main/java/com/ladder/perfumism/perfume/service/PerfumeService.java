package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.PerfumeAccordRepository;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeAccordRepository perfumeAccordRepository;

    public PerfumeService(PerfumeRepository perfumeRepository,
        PerfumeAccordRepository perfumeAccordRepository) {
        this.perfumeRepository = perfumeRepository;
        this.perfumeAccordRepository = perfumeAccordRepository;
    }

    public PerfumeDetailResponse viewDetailPerfume(Long perfumeId) {
        Perfume perfume = perfumeRepository.getById(perfumeId);

        List<PerfumeAccord> perfumeAccords = perfumeAccordRepository.findByPerfume(perfume);

        return PerfumeDetailResponse.from(perfume, perfumeAccords);
    }
}
