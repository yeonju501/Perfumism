package com.ladder.perfumism.review.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.review.controller.dto.request.ReviewWriteRequest;
import com.ladder.perfumism.review.controller.dto.response.ReviewPageResponse;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import com.ladder.perfumism.review.domain.Review;
import com.ladder.perfumism.review.domain.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService {

    private ReviewRepository reviewRepository;
    private PerfumeRepository perfumeRepository;
    private MemberRepository memberRepository;

    public ReviewService(ReviewRepository reviewRepository, PerfumeRepository perfumeRepository,
        MemberRepository memberRepository) {
        this.reviewRepository = reviewRepository;
        this.perfumeRepository = perfumeRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Long writeReview(ReviewWriteRequest request, String email, Long perfumeId) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        Review review = reviewRepository.save(Review.createReview(perfume, member, request));

        //TODO:평점 평균 구하는 로직
        // 해당 로직은 데이터가 모두 들어왔을 때 작성 예정

        return review.getId();
    }

    @Transactional(readOnly = true)
    public ReviewPageResponse getReviewPage(Long perfumeId, Pageable pageable){
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        Page<Review> reviewList = reviewRepository.findByPerfumeId(perfume, pageable);

        return ReviewPageResponse.from(reviewList);
    }
}
