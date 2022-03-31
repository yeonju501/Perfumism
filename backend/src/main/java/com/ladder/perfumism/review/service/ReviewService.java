package com.ladder.perfumism.review.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.perfume.service.PerfumeService;
import com.ladder.perfumism.review.controller.dto.request.ReviewWriteRequest;
import com.ladder.perfumism.review.controller.dto.response.ReviewLatestPageResponse;
import com.ladder.perfumism.review.controller.dto.response.ReviewPageResponse;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.review.controller.dto.response.ReviewResponse;
import com.ladder.perfumism.review.domain.Review;
import com.ladder.perfumism.review.domain.ReviewLikeRepository;
import com.ladder.perfumism.review.domain.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MemberService memberService;
    private final PerfumeService perfumeService;
    private final ReviewLikeRepository reviewLikeRepository;

    public ReviewService(ReviewRepository reviewRepository, MemberService memberService,
        PerfumeService perfumeService, ReviewLikeRepository reviewLikeRepository) {
        this.reviewRepository = reviewRepository;
        this.memberService = memberService;
        this.perfumeService = perfumeService;
        this.reviewLikeRepository = reviewLikeRepository;
    }

    @Transactional
    public Review writeReview(String email, Long perfumeId, ReviewWriteRequest request) {
        Member member = memberService.findByEmail(email);
        Perfume perfume = perfumeService.findById(perfumeId);

        alreadyWritten(member, perfume);

        Review review = reviewRepository.save(Review.createReview(perfume, member, request));

        averageGrade(perfume);
        perfume.increaseTotalSurvey();

        return review;
    }

    private void averageGrade(Perfume perfume) {
        Double avgGrade = reviewRepository.avgGradeByPerfumeId(perfume.getId());
        if (avgGrade == null) {
            perfume.saveGrade(0.0);
            return;
        }
        perfume.saveGrade(avgGrade);
    }

    private void alreadyWritten(Member member, Perfume perfume) {
        if (reviewRepository.existsByMemberIdAndPerfumeId(member, perfume)) {
            throw new BusinessException(ErrorCode.REVIEW_ALREADY_WRITTEN);
        }
    }

    @Transactional(readOnly = true)
    public ReviewPageResponse getReviewPage(Long perfumeId, Pageable pageable) {
        Perfume perfume = perfumeService.findById(perfumeId);

        Page<Review> reviewList = reviewRepository.findByPerfumeId(perfume, pageable);

        return ReviewPageResponse.from(reviewList);
    }

    @Transactional
    public void changeReview(String email, Long reviewId, ReviewWriteRequest request) {
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_FOUND_BY_ID));

        isYourReview(email, review);

        if (!request.getGrade().equals(review.getGrade())) {
            review.changeGrade(request.getGrade());

            averageGrade(review.getPerfumeId());

        }

        review.changeContent(request.getContent());

        reviewRepository.save(review);
    }

    private void isYourReview(String email, Review review) {
        if (!review.getMemberId().getEmail().equals(email)) {
            throw new BusinessException(ErrorCode.REVIEW_NOT_YOUR_REVIEW);
        }
    }

    @Transactional
    public void removeReview(String email, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_FOUND_BY_ID));

        isYourReview(email, review);

        reviewLikeRepository.updateDeletedAtByReviewId(reviewId);

        review.saveDeletedTime();
        averageGrade(review.getPerfumeId());
        review.getPerfumeId().decreaseTotalSurvey();
    }

    @Transactional(readOnly = true)
    public ReviewPageResponse getMyReviewPage(String email, Pageable pageable) {
        Member member = memberService.findByEmail(email);

        Page<Review> reviewList = reviewRepository.findByMemberId(member, pageable);

        return ReviewPageResponse.from(reviewList);
    }

    @Transactional(readOnly = true)
    public ReviewResponse getMyPerfumeReview(String email, Long perfumeId) {
        Member member = memberService.findByEmail(email);
        Perfume perfume = perfumeService.findById(perfumeId);

        Review review = reviewRepository.findByMemberIdAndPerfumeId(member, perfume)
            .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_WRITTEN_THIS_PERFUME));

        return ReviewResponse.from(review);
    }

    @Transactional(readOnly = true)
    public ReviewLatestPageResponse getLatestReviewPage(Pageable pageable) {
        return ReviewLatestPageResponse.from(reviewRepository.findAll(pageable));
    }
}
