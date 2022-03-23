package com.ladder.perfumism.review.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.review.controller.dto.response.ReviewLikeResponse;
import com.ladder.perfumism.review.domain.Review;
import com.ladder.perfumism.review.domain.ReviewLike;
import com.ladder.perfumism.review.domain.ReviewLikeRepository;
import com.ladder.perfumism.review.domain.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewLikeService {

    private final MemberService memberService;
    private final ReviewRepository reviewRepository;
    private final ReviewLikeRepository reviewLikeRepository;

    public ReviewLikeService(MemberService memberService, ReviewRepository reviewRepository,
        ReviewLikeRepository reviewLikeRepository) {
        this.memberService = memberService;
        this.reviewRepository = reviewRepository;
        this.reviewLikeRepository = reviewLikeRepository;
    }

    @Transactional
    public Long likeReview(String email, Long reviewId) {
        Member member = memberService.findByEmail(email);
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_FOUND_BY_ID));

        doNotLikeYourReview(member, review);
        alreadyLikeReview(member, review);

        ReviewLike reviewLike = reviewLikeRepository.save(ReviewLike.createReviewLike(review, member));

        review.saveLike(reviewLikeRepository.countByReviewId(review));

        return reviewLike.getId();
    }

    private void alreadyLikeReview(Member member, Review review) {
        if (reviewLikeRepository.existsByMemberIdAndReviewId(member, review)) {
            throw new BusinessException(ErrorCode.REVIEW_ALREADY_LIKE);
        }
    }

    private void doNotLikeYourReview(Member member, Review review) {
        if (member.getId().equals(review.getMemberId().getId())) {
            throw new BusinessException(ErrorCode.REVIEW_NO_LIKE_YOURSELF);
        }
    }

    @Transactional(readOnly = true)
    public ReviewLikeResponse isLikeThisReview(String email, Long reviewId) {
        Member member = memberService.findByEmail(email);
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_FOUND_BY_ID));

        Boolean liked = reviewLikeRepository.existsByMemberIdAndReviewId(member,review);

        return ReviewLikeResponse.from(liked);
    }

    @Transactional
    public void notLikeThisReviewAnymore(String email, Long reviewId){
        Member member = memberService.findByEmail(email);
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_FOUND_BY_ID));

        ReviewLike reviewLike = reviewLikeRepository.findByMemberIdAndReviewId(member, review)
            .orElseThrow(()-> new BusinessException(ErrorCode.REVIEW_NOT_LIKE_THIS_BEFORE));

        reviewLike.saveDeletedTime();

        review.saveLike(reviewLikeRepository.countByReviewId(review));
    }
}
