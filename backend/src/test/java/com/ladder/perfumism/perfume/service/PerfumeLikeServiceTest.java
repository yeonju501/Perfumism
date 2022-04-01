package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeLike;
import com.ladder.perfumism.perfume.domain.PerfumeLikeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PerfumeLikeServiceTest {

    @InjectMocks
    private PerfumeLikeService perfumeLikeService;

    @Mock
    private MemberService memberService;

    @Mock
    private PerfumeService perfumeService;

    @Mock
    private PerfumeLikeRepository perfumeLikeRepository;

    private Member member;
    private Perfume perfume;
    private Brand brand;
    private PerfumeLike perfumeLike;

    @BeforeEach
    void setUp() {
        member = new Member("test1@test.com", "test1", "test1", Authority.ROLE_MEMBER, "");
        brand = new Brand(1L, "testBrand");
        perfume = new Perfume(1L, "testPerfume", brand, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        perfumeLike = new PerfumeLike(1L, perfume, member);
    }

}
