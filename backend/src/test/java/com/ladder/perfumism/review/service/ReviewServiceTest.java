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
import com.ladder.perfumism.perfume.service.PerfumeService;
import com.ladder.perfumism.review.controller.dto.request.ReviewWriteRequest;
import com.ladder.perfumism.review.controller.dto.response.ReviewPageResponse;
import com.ladder.perfumism.review.domain.Review;
import com.ladder.perfumism.review.domain.ReviewRepository;
import java.util.ArrayList;
import java.util.List;
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
public class ReviewServiceTest {

    private static final int FIRST_PAGE = 0;
    private static final int DEFAULT_SIZE = 10;

    // 의존성 주입이 필요한 Mock 객체
    @InjectMocks
    private ReviewService reviewService;

    // 여기서는 Service 의 메서드를 테스트하는 공간이므로
    // 테스트 하려는 Service 속에 있는 타 Service 나 Repository 는 Mock 으로 가상의 객체를 만들어서 테스트 한다.
    // 여기서는 reviewService 가 주요 테스트 목표이므로, ReviewService 내에 있는 모든 Repository 활동들은 given() 으로 처리하는 것이 편하다.
    // 여기는 Service 에 관한 테스트 공간이지 Repository 에 대한 공간이 아니므로 Repository 에 대한 반환 값을 정확히 받을 필요가 없기 때문.
    // 그리고 애초에 Mock 객체여서 제대로 작동하지 않을 것이다.
    // Repository 에 대한 테스트는 해당 레포지토리 테스트 클래스를 새로 파서 하길 바람.
    @Mock
    private PerfumeService perfumeService;

    @Mock
    private MemberService memberService;

    @Mock
    private ReviewRepository reviewRepository;

    private Member member;
    private Perfume perfume;
    private Brand brand;
    private Review review;

    // @BeforeEach 는 각 테스트 시작 전 매번 실행된다.
    // @AfterEach 또한 각 테스트 완료 후 매번 실행된다.
    @BeforeEach
    void Setup() {
        member = new Member("test@test.com", "test", "test", Authority.ROLE_MEMBER, "");
        brand = new Brand(1L, "testBrand");
        perfume = new Perfume(1L, "testPerfume", brand, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        review = new Review(1L, perfume, member, 0, "testContent", 0);
    }

    @Test
    @DisplayName("리뷰 저장")
    public void writeReviewTest() {
        // given
        String email = "test@test.com";
        // given() 은 ()속의 메서드를 테스트 진행 중에 만난다면 willReturn 의 ()속의 값을 반환해주는 메서드다.
        // any()는 "어떤 값이 들어오든 간에" 라는 의미를 갖고 있다.
        given(memberService.findByEmail(any())).willReturn(member);
        given(perfumeService.findById(any())).willReturn(perfume);
        ReviewWriteRequest request = new ReviewWriteRequest(0, "testContent");
        given(reviewRepository.save(any())).willReturn(review);

        // when
        Review result = reviewService.writeReview(email, perfume.getId(), request);

        // then
        assertThat(result).isNotNull();
    }

    @Test
    @DisplayName("리뷰 조회")
    public void getReviewPageTest() {
        // given
        Pageable pageable = PageRequest.of(FIRST_PAGE, DEFAULT_SIZE, Sort.by("id").descending());

        List<Review> reviews = new ArrayList<>();
        reviews.add(review);
        Page<Review> reviewPage = new PageImpl<>(reviews);
        given(perfumeService.findById(1L)).willReturn(perfume);
        given(reviewRepository.findByPerfumeId(perfume, pageable)).willReturn(reviewPage);

        // when
        ReviewPageResponse result = reviewService.getReviewPage(1L, pageable);

        // then
        System.out.println(
            "Response: id = " + result.getReviewResponses().get(0).getReviewId() + ", content = " + result.getReviewResponses()
                .get(0).getContent());
        System.out.println("Review: id = " + review.getId() + ", content = " + review.getContent());
        assertThat(result.getReviewResponses().get(0).getReviewId()).isEqualTo(review.getId());
        assertThat(result.getReviewResponses().get(0).getContent()).isEqualTo(review.getContent());
    }

    @Test
    @DisplayName("ERROR 이미 작성한 리뷰")
    public void alreadyWrittenTest() {
        // given
        String email = "test@test.com";
        given(memberService.findByEmail(email)).willReturn(member);
        given(perfumeService.findById(1L)).willReturn(perfume);
        given(reviewRepository.existsByMemberIdAndPerfumeId(member, perfume)).willReturn(true);
        ReviewWriteRequest request = new ReviewWriteRequest(0, "test");

        //then
        assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> reviewService.writeReview(email, perfume.getId(), request));
    }
}
