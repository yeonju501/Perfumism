package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.domain.Accord;
import com.ladder.perfumism.perfume.domain.AccordRepository;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.BrandRepository;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import java.util.List;
import org.springframework.data.domain.Page;
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

        Page<Perfume> perfumes;
        switch (type) {
            case "name":
                perfumes = perfumeRepository.findByNameContainsIgnoreCase(keyword, pageable);
                break;
            case "brand":
                List<Brand> brands = brandRepository.findByNameStartsWithIgnoreCase(keyword);
                if (brands.isEmpty()) {
                    throw new BusinessException(ErrorCode.BRAND_NOT_FOUND_BY_NAME);
                }
                perfumes = perfumeRepository.findByBrandId(brands, pageable);
                break;
            case "accord":
                Accord accord = accordRepository.findByEngNameIgnoreCaseOrKorName(keyword, keyword)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACCORD_NOT_FOUND_BY_NAME));

                perfumes = perfumeRepository.findByAccordId(accord, pageable);
                break;
            default:
                throw new BusinessException(ErrorCode.SEARCH_NOT_EXIST_TYPE);
        }

        return PerfumeListResponse.from(perfumes);
    }

    private void checkKeywordLength(String keyword) {
        if (keyword.length() < MIN_KEYWORD_LENGTH) {
            throw new BusinessException(ErrorCode.SEARCH_TOO_SHORT_KEYWORD);
        }
    }
}
