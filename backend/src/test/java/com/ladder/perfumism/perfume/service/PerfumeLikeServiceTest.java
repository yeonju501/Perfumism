package com.ladder.perfumism.perfume.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeLikeResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeLike;
import com.ladder.perfumism.perfume.domain.PerfumeLikeRepository;
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
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
public class PerfumeLikeServiceTest {

    private static final int FIRST_PAGE = 0;
    private static final int DEFAULT_SIZE = 10;

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
    private String email;

    @BeforeEach
    void setUp() {
        email = "test1@test.com";
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
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        given(perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume)).willReturn(true);

        // when & then
        assertThatExceptionOfType(BusinessException.class).isThrownBy(
            () -> perfumeLikeService.likePerfume(email, perfume.getId()));
    }

    @Test
    @DisplayName("향수 좋아요 여부 - true")
    void isLikeThisPerfumePositiveTest() {
        // given
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        given(perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume)).willReturn(true);

        // when
        PerfumeLikeResponse result = perfumeLikeService.isLikeThisPerfume(email, perfume.getId());

        // then
        assertThat(result.getIsLiked()).isEqualTo(true);
    }

    @Test
    @DisplayName("향수 좋아요 여부 - false")
    void isLikeThisPerfumeNegativeTest() {
        // given
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        given(perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume)).willReturn(false);

        // when
        PerfumeLikeResponse result = perfumeLikeService.isLikeThisPerfume(email, perfume.getId());

        // then
        assertThat(result.getIsLiked()).isEqualTo(false);
    }

    @Test
    @DisplayName("향수 좋아요 취소")
    void notLikeThisPerfumeAnymoreTest() {
        // given
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        given(perfumeLikeRepository.findByPerfumeIdAndMemberId(perfume, member)).willReturn(Optional.of(perfumeLike));
        given(perfumeLikeRepository.countByPerfumeId(perfume)).willReturn(0);

        // when
        perfumeLikeService.notLikeThisPerfumeAnymore(email, perfume.getId());

        // then
        assertThat(perfumeLike.getDeletedAt()).isNotNull();
        assertThat(perfume.getTotalLike()).isEqualTo(0);
    }

    @Test
    @DisplayName("ERROR 좋아요 한 적 없는 향수")
    void notLikeThisPerfumeBeforeTest() {
        // given
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        given(perfumeLikeRepository.findByPerfumeIdAndMemberId(perfume, member)).willThrow(
            new BusinessException(ErrorCode.PERFUME_NOT_LIKE_THIS_BEFORE));

        // when & then
        assertThatExceptionOfType(BusinessException.class).isThrownBy(
            () -> perfumeLikeService.notLikeThisPerfumeAnymore(email, perfume.getId()));
    }

    @Test
    @DisplayName("내가 좋아요한 향수 리스트")
    void myFavoritePerfumeListTest() {
        // given
        Pageable pageable = PageRequest.of(FIRST_PAGE, DEFAULT_SIZE, Sort.by("id").descending());
        List<PerfumeLike> perfumeLikes = new ArrayList<>();
        perfumeLikes.add(perfumeLike);
        Page<PerfumeLike> perfumeLikePage = new PageImpl<>(perfumeLikes);
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeLikeRepository.findByMemberId(member, pageable)).willReturn(perfumeLikePage);

        //when
        PerfumeListResponse result = perfumeLikeService.myFavoritePerfumeList(email, pageable);

        //then
        assertThat(result.getPerfumeSimpleResponses().get(0).getId()).isEqualTo(perfume.getId());
        assertThat(result.getPerfumeSimpleResponses().get(0).getName()).isEqualTo(perfume.getName());
    }
}
