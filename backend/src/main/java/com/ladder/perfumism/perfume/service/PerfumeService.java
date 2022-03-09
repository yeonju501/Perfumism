package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import org.springframework.stereotype.Service;

@Service
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;

    public PerfumeService(PerfumeRepository perfumeRepository) {
        this.perfumeRepository = perfumeRepository;
    }

    public PerfumeDetailResponse viewDetailPerfume(Long perfumeId) {
        Perfume perfume = perfumeRepository.getById(perfumeId);

        return PerfumeDetailResponse.from(perfume);
    }
}
