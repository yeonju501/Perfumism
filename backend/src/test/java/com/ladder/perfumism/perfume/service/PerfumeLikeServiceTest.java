package com.ladder.perfumism.perfume.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeLike;
import com.ladder.perfumism.perfume.domain.PerfumeLikeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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
        perfume = new Perfume(2L, "testPerfume", brand, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        perfumeLike = new PerfumeLike(3L, perfume, member);
    }

    @Test
    @DisplayName("향수 좋아요")
    void likePerfumeTest() {
        // given
        String email = "test1@test.com";
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        given(perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume)).willReturn(false);
        given(perfumeLikeRepository.save(any())).willReturn(perfumeLike);
        given(perfumeLikeRepository.countByPerfumeId(perfume)).willReturn(1);

        // when
        Long result = perfumeLikeService.likePerfume(email, perfume.getId());

        // then
        assertThat(perfumeLike.getId()).isEqualTo(result);
        assertThat(perfume.getTotalLike()).isEqualTo(1);
    }

    @Test
    @DisplayName("ERROR 이미 좋아한 향수")
    void alreadyLikePerfumeTest() {
        // given
        String email = "test1@test.com";
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        given(perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume)).willReturn(true);

        // when & then
        assertThatExceptionOfType(BusinessException.class).isThrownBy(
            () -> perfumeLikeService.likePerfume(email, perfume.getId()));
    }
}
