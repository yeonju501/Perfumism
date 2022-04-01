package com.ladder.perfumism.perfume.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.perfume.domain.Accord;
import com.ladder.perfumism.perfume.domain.AccordRepository;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.BrandRepository;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PerfumeSearchServiceTest {

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
    private Accord accord1, accord2, accord3;
    private PerfumeAccord perfumeAccord1, perfumeAccord2, perfumeAccord3;

    @BeforeEach
    void setup() {
        brand1 = new Brand(1L, "Brand BBB");
        brand2 = new Brand(2L, "Brand CCC");
        brand3 = new Brand(3L, "Brand AAA");
        perfume1 = new Perfume(4L, "Perfume AAA", brand1, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        perfume2 = new Perfume(5L, "Perfume BBB", brand2, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        perfume3 = new Perfume(6L, "Perfume CCC", brand3, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        accord1 = new Accord(7L, "다다다", "CCC");
        accord2 = new Accord(8L, "가가가", "AAA");
        accord3 = new Accord(9L, "나나나", "BBB");
        perfumeAccord1 = new PerfumeAccord(10L, accord1, perfume1);
        perfumeAccord2 = new PerfumeAccord(11L, accord2, perfume2);
        perfumeAccord3 = new PerfumeAccord(12L, accord3, perfume3);
    }
}
