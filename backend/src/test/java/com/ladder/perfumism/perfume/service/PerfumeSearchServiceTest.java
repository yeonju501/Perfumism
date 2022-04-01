package com.ladder.perfumism.perfume.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.domain.Accord;
import com.ladder.perfumism.perfume.domain.AccordRepository;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.BrandRepository;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
public class PerfumeSearchServiceTest {

    private static final int FIRST_PAGE = 0;
    private static final int DEFAULT_SIZE = 10;

    @InjectMocks
    private PerfumeSearchService perfumeSearchService;

    @Mock
    private PerfumeRepository perfumeRepository;

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private AccordRepository accordRepository;

    private Brand brand1, brand2, brand3;
    private Perfume perfume1, perfume2, perfume3;
    private Accord accord;
    private PerfumeAccord perfumeAccord1, perfumeAccord2;

    @BeforeEach
    void setup() {
        brand1 = new Brand(1L, "Brand AAA");
        brand2 = new Brand(3L, "Brand BBB");
        perfume1 = new Perfume(4L, "Perfume AAA", brand1, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        perfume2 = new Perfume(5L, "Perfume BBB", brand1, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        perfume3 = new Perfume(6L, "Perfume CCC", brand2, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        accord = new Accord(7L, "다다다", "Accord CCC");
        perfumeAccord1 = new PerfumeAccord(10L, accord, perfume1);
        perfumeAccord2 = new PerfumeAccord(11L, accord, perfume3);
    }

    @Test
    @DisplayName("향수 검색 - 이름")
    void perfumeSearchByNameTest() {
        // given
        String type = "name";
        String keyword = "Perfume";
        Pageable pageable = PageRequest.of(FIRST_PAGE, DEFAULT_SIZE);
        List<Perfume> perfumes = new ArrayList<>();
        perfumes.add(perfume1);
        perfumes.add(perfume2);
        perfumes.add(perfume3);
        Page<Perfume> perfumePage = new PageImpl<>(perfumes);
        given(perfumeRepository.findByNameContainsIgnoreCase(keyword, pageable)).willReturn(perfumePage);

        // when
        PerfumeListResponse result = perfumeSearchService.getPerfumeSearch(pageable, type, keyword);

        // then
        assertThat(result.getPerfumeSimpleResponses().get(0).getName()).isEqualTo("Perfume AAA");
        assertThat(result.getPerfumeSimpleResponses().get(1).getName()).isEqualTo("Perfume BBB");
        assertThat(result.getPerfumeSimpleResponses().get(2).getName()).isEqualTo("Perfume CCC");
    }

    @Test
    @DisplayName("향수 검색 - 브랜드")
    void perfumeSearchByBrandTest() {
        // given
        String type = "brand";
        String keyword = "Brand AAA";

        List<Brand> brands = new ArrayList<>();
        brands.add(brand1);
        given(brandRepository.findByNameStartsWithIgnoreCase(keyword)).willReturn(brands);

        Pageable pageable = PageRequest.of(FIRST_PAGE, DEFAULT_SIZE);
        List<Perfume> perfumes = new ArrayList<>();
        perfumes.add(perfume1);
        perfumes.add(perfume2);
        Page<Perfume> perfumePage = new PageImpl<>(perfumes);
        given(perfumeRepository.findByBrandId(brands, pageable)).willReturn(perfumePage);

        // when
        PerfumeListResponse result = perfumeSearchService.getPerfumeSearch(pageable, type, keyword);

        // then
        assertThat(result.getPerfumeSimpleResponses().get(0).getBrand().getName()).isEqualTo(keyword);
        assertThat(result.getPerfumeSimpleResponses().get(1).getBrand().getName()).isEqualTo(keyword);
    }

    @Test
    @DisplayName("향수 검색 - 어코드")
    void perfumeSearchByAccordTest() {
        // given
        String type = "accord";
        String keyword = "Accord CCC";

        given(accordRepository.findByEngNameIgnoreCaseOrKorName(keyword, keyword)).willReturn(Optional.of(accord));

        Pageable pageable = PageRequest.of(FIRST_PAGE, DEFAULT_SIZE);
        List<Perfume> perfumes = new ArrayList<>();
        perfumes.add(perfume1);
        perfumes.add(perfume3);
        Page<Perfume> perfumePage = new PageImpl<>(perfumes);
        given(perfumeRepository.findByAccordId(accord, pageable)).willReturn(perfumePage);

        // when
        PerfumeListResponse result = perfumeSearchService.getPerfumeSearch(pageable, type, keyword);

        // then
        assertThat(result.getPerfumeSimpleResponses().get(0).getId()).isEqualTo(perfume1.getId());
        assertThat(result.getPerfumeSimpleResponses().get(1).getId()).isEqualTo(perfume3.getId());
    }

    @Test
    @DisplayName("ERROR 2글자 미만 검색어")
    void tooShortKeywordTest() {
        // given
        String type = "ㅋㅋㅋ";
        String keyword = "ㅋ";
        Pageable pageable = PageRequest.of(FIRST_PAGE, DEFAULT_SIZE);

        // when & then
        assertThatExceptionOfType(BusinessException.class).isThrownBy(
            () -> perfumeSearchService.getPerfumeSearch(pageable, type, keyword));
    }
}
