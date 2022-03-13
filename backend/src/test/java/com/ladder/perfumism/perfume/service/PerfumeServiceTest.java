package com.ladder.perfumism.perfume.service;

import static com.ladder.perfumism.perfume.util.BrandFixture.BRAND_ID;
import static com.ladder.perfumism.perfume.util.BrandFixture.BRAND_NAME;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.PERFUME_ID;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.PERFUME_NAME;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.IMAGE;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.LAUNCH_YEAR;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.AVERAGE_GRADE;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.TOP_NOTES;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.MIDDLE_NOTES;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.BASE_NOTES;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.TOTAL_SURVEY;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.LONGEVITY;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.SILLAGE;
import static com.ladder.perfumism.perfume.util.PerfumeFixture.createPerfume;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.BrandRepository;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccordRepository;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import com.ladder.perfumism.perfume.domain.SimilarPerfumeRepository;
import com.ladder.perfumism.perfume.util.BrandFixture;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PerfumeServiceTest {

    // Mock 은 테스트용 임시 데이터 공간을 의미한다.
    // 따라서 여기에 Mock 을 통해 선언되는 Repository 에는 아무것도 없다.
    @Mock
    private PerfumeRepository perfumeRepository;

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private PerfumeAccordRepository perfumeAccordRepository;

    @Mock
    private SimilarPerfumeRepository similarPerfumeRepository;

    @InjectMocks
    private PerfumeService perfumeService;

    // 각각 테스트 매서드가 끝날 때 마다 실행된다.
    // 이외에도 BeforeEach 가 있다.
    // 현재 테스트 클래스의 시작과 전에 실행되는
    // BeforeAll 과 AfterAll 이 있지만
    // static 으로 선언해야 해서 복잡하다.
    @AfterEach
    void cleanup() {
        perfumeRepository.deleteAll();
        brandRepository.deleteAll();
        perfumeAccordRepository.deleteAll();
        similarPerfumeRepository.deleteAll();
    }

    @Test
    @DisplayName("존재하는 퍼퓸 ID를 조회할 수 있다.")
    void perfumeRead() {
        //given
        Brand brand = BrandFixture.createBrand(BRAND_ID, BRAND_NAME);
        Perfume perfume = createPerfume(PERFUME_ID, PERFUME_NAME, brand, IMAGE, LAUNCH_YEAR, AVERAGE_GRADE, TOP_NOTES,
            MIDDLE_NOTES, BASE_NOTES, TOTAL_SURVEY, LONGEVITY, SILLAGE);

        when(perfumeRepository.findById(any())).thenReturn(Optional.ofNullable(perfume));

        //when
        PerfumeDetailResponse perfumeDetailResponse = perfumeService.viewDetailPerfume(1L);

        //then
        Assertions.assertThat(perfumeDetailResponse.getName()).isEqualTo(PERFUME_NAME);
    }

    @Test
    @DisplayName("존재하지 않는 퍼퓸 ID를 조회하면 ErrorCode S01이 발생한다.")
    void notExistPerfumeId() {
        // when & then
        Assertions.assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> perfumeService.viewDetailPerfume(PERFUME_ID))
            .withMessageMatching(ErrorCode.PERFUME_NOT_FOUND_BY_ID.getMessage());
    }
}
