package com.ladder.perfumism.review.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.review.controller.dto.response.ReviewLikeResponse;
import com.ladder.perfumism.review.domain.Review;
import com.ladder.perfumism.review.domain.ReviewLike;
import com.ladder.perfumism.review.domain.ReviewLikeRepository;
import com.ladder.perfumism.review.domain.ReviewRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ReviewLikeServiceTest {

    @InjectMocks
    private ReviewLikeService reviewLikeService;

    @Mock
    private ReviewLikeRepository reviewLikeRepository;

    @Mock
    private MemberService memberService;

    @Mock
    private ReviewRepository reviewRepository;

    private Member member1;
    private Member member2;
    private Perfume perfume;
    private Brand brand;
    private Review review1;
    private ReviewLike reviewLike;

    @BeforeEach
    void Setup() {
        member1 = new Member("test1@test.com", "test1", "test1", Authority.ROLE_MEMBER, "");
        member2 = new Member("test2@test.com", "test2", "test2", Authority.ROLE_MEMBER, "");
        brand = new Brand(1L, "testBrand");
        perfume = new Perfume(1L, "testPerfume", brand, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        review1 = new Review(1L, perfume, member1, 0, "testContent", 0);
        reviewLike = new ReviewLike(1L, review1, member2);
        // 멤버1은 리뷰를 작성한 사람, 멤버2는 좋아요를 누르는 사람이라고 모든 데이터는 가정되어있음.
    }

    @Test
    @DisplayName("리뷰 좋아요하기")
    void likeReviewTest() {
        // given
        String email = "test2@test.com";
        given(memberService.findByEmail(email)).willReturn(member2);
        given(reviewRepository.findById(any())).willReturn(Optional.of(review1));
        given(reviewLikeRepository.existsByMemberIdAndReviewId(member2, review1)).willReturn(false);
        given(reviewLikeRepository.save(any())).willReturn(reviewLike);

        // when
        reviewLikeService.likeReview(email, review1.getId());

        //then
        assertThat(reviewLike.getMemberId()).isEqualTo(member2);
        assertThat(reviewLike.getReviewId()).isEqualTo(review1);
    }

    @Test
    @DisplayName("ERROR 이미 좋아한 리뷰")
    void alreadyLikeReviewTest() {
        // given
        String email = "test2@test.com";
        given(memberService.findByEmail(email)).willReturn(member2);
        given(reviewRepository.findById(any())).willReturn(Optional.of(review1));
        given(reviewLikeRepository.existsByMemberIdAndReviewId(member2, review1)).willReturn(true);

        // when & then
        assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> reviewLikeService.likeReview(email, review1.getId()));
    }

    @Test
    @DisplayName("ERROR 자추")
    void narcissismTest() {
        // given
        String email = "test1@test.com";
        given(memberService.findByEmail(email)).willReturn(member1);
        given(reviewRepository.findById(any())).willReturn(Optional.of(review1));

        // when & then
        assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> reviewLikeService.likeReview(email, review1.getId()));
    }

    @Test
    @DisplayName("좋아요 여부 확인 - true")
    void ILikeThisReviewTest() {
        //given
        String email = "test2@test.com";
        given(memberService.findByEmail(email)).willReturn(member2);
        given(reviewRepository.findById(any())).willReturn(Optional.of(review1));
        given(reviewLikeRepository.existsByMemberIdAndReviewId(member2, review1)).willReturn(true);

        //when
        ReviewLikeResponse reviewLikeResponse = reviewLikeService.isLikeThisReview(email, review1.getId());

        //then
        assertThat(reviewLikeResponse.getIsLiked()).isEqualTo(true);
    }

    @Test
    @DisplayName("좋아요 여부 확인 - false")
    void IDontLikeThisReviewTest() {
        //given
        String email = "test2@test.com";
        given(memberService.findByEmail(email)).willReturn(member2);
        given(reviewRepository.findById(any())).willReturn(Optional.of(review1));
        given(reviewLikeRepository.existsByMemberIdAndReviewId(member2, review1)).willReturn(false);

        //when
        ReviewLikeResponse reviewLikeResponse = reviewLikeService.isLikeThisReview(email, review1.getId());

        //then
        assertThat(reviewLikeResponse.getIsLiked()).isEqualTo(false);
    }
}
