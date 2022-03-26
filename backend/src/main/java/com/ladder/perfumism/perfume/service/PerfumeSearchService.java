package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.domain.Accord;
import com.ladder.perfumism.perfume.domain.AccordRepository;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.BrandRepository;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PerfumeSearchService {

    private final Integer MIN_KEYWORD_LENGTH = 2;

    private final PerfumeRepository perfumeRepository;
    private final BrandRepository brandRepository;
    private final AccordRepository accordRepository;

    public PerfumeSearchService(PerfumeRepository perfumeRepository,
        BrandRepository brandRepository, AccordRepository accordRepository) {
        this.perfumeRepository = perfumeRepository;
        this.brandRepository = brandRepository;
        this.accordRepository = accordRepository;
    }

    @Transactional(readOnly = true)
    public PerfumeListResponse getPerfumeSearch(Pageable pageable, String type, String keyword) {
        checkKeywordLength(keyword);

        switch (type) {
            case "name":
                return PerfumeListResponse.from(perfumeRepository.findByNameContainsIgnoreCase(keyword, pageable));
            case "brand":
                List<Brand> brands = brandRepository.findByNameStartsWithIgnoreCase(keyword);
                if (brands.isEmpty()) {
                    return PerfumeListResponse.createEmptyList();
                }
                return PerfumeListResponse.from(perfumeRepository.findByBrandId(brands, pageable));
            case "accord":
                Accord accord = accordRepository.findByEngNameIgnoreCaseOrKorName(keyword, keyword).orElseGet(() -> null);
                if (accord == null) {
                    return PerfumeListResponse.createEmptyList();
                }
                return PerfumeListResponse.from(perfumeRepository.findByAccordId(accord, pageable));
            default:
                throw new BusinessException(ErrorCode.SEARCH_NOT_EXIST_TYPE);
        }
    }

    private void checkKeywordLength(String keyword) {
        if (keyword.length() < MIN_KEYWORD_LENGTH) {
            throw new BusinessException(ErrorCode.SEARCH_TOO_SHORT_KEYWORD);
        }
    }

    @Transactional(readOnly = true)
    public PerfumeListResponse getPerfumeSearchAll(Pageable pageable, String keyword) {
        checkKeywordLength(keyword);

        return PerfumeListResponse.from(perfumeRepository.searchAll(keyword, pageable));
    }
}
