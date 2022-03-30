package com.ladder.perfumism.review.service;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.perfume.domain.Brand;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.service.PerfumeService;
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

    @InjectMocks
    private ReviewService reviewService;

    @Mock
    private PerfumeService perfumeService;

    @Mock
    private ReviewRepository reviewRepository;

    private Member member;
    private Perfume perfume;
    private Brand brand;
    private Review review;

    @BeforeEach
    void Setup() {
        member = new Member("test@test.com", "test", "test", Authority.ROLE_MEMBER, "");
        brand = new Brand(1L, "testBrand");
        perfume = new Perfume(1L, "testPerfume", brand, "testImage", 2000, 0.0, "testTopNote",
            "testMiddleNotes", "testBaseNotes", 0L, "testLongevity", "testSillage", 0);
        review = new Review(perfume, member, 0, "testContent", 0);
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

        //then
        System.out.println(
            "Response: id = " + result.getReviewResponses().get(0).getReviewId() + ", content = " + result.getReviewResponses()
                .get(0).getContent());
        System.out.println("Review: id = " + review.getId() + ", content = " + review.getContent());
        assertThat(result.getReviewResponses().get(0).getReviewId()).isEqualTo(review.getId());
        assertThat(result.getReviewResponses().get(0).getContent()).isEqualTo(review.getContent());
    }
}
