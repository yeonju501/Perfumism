package com.ladder.perfumism.review.controller;

import com.ladder.perfumism.review.controller.dto.request.ReviewWriteRequest;
import com.ladder.perfumism.review.controller.dto.response.ReviewLikeResponse;
import com.ladder.perfumism.review.controller.dto.response.ReviewPageResponse;
import com.ladder.perfumism.review.controller.dto.response.ReviewResponse;
import com.ladder.perfumism.review.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"리뷰와 평점"})
public class ReviewRestController {

    private final ReviewService reviewService;

    public ReviewRestController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/auth/reviews/perfumes/{perfume_id}")
    @ApiOperation(value = "리뷰와 평점 등록", notes = "<b>(로그인 필요)</b> 특정 향수에 리뷰와 평점을 등록하는 API 입니다.")
    @ApiImplicitParam(name = "perfume_id", value = "리뷰를 등록할 향수 ID", required = true)
    public ResponseEntity<Void> createReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @RequestBody ReviewWriteRequest request, @PathVariable(value = "perfume_id") Long perfumeId) {
        Long newReviewId = reviewService.writeReview(email, perfumeId, request);
        URI uri = URI.create("/api/reviews/" + perfumeId + "/" + newReviewId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/reviews/perfumes/{perfume_id}")
    @ApiOperation(value = "리뷰 목록 조회", notes = "특정 향수의 리뷰 목록을 조회하는 API 입니다.")
    @ApiImplicitParam(name = "perfume_id", value = "리뷰 목록을 불러올 향수 ID", required = true)
    public ResponseEntity<ReviewPageResponse> viewReviewPage(@PathVariable(value = "perfume_id") Long perfumeId,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(reviewService.getReviewPage(perfumeId, pageable));
    }

    @PutMapping("/auth/reviews/{review_id}")
    @ApiOperation(value = "리뷰 수정", notes = "<b>(로그인 필요)</b> 특정 리뷰를 수정하는 API 입니다.")
    @ApiImplicitParam(name = "review_id", value = "수정할 리뷰 ID", required = true)
    public ResponseEntity<Void> updateReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId, @RequestBody ReviewWriteRequest request) {
        reviewService.changeReview(email, reviewId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/auth/reviews/{review_id}")
    @ApiOperation(value = "리뷰 삭제", notes = "<b>(로그인 필요)</b> 특정 리뷰를 삭제하는 API 입니다.")
    @ApiImplicitParam(name = "review_id", value = "삭제할 리뷰 ID", required = true)
    public ResponseEntity<Void> DeleteReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId) {
        reviewService.removeReview(email, reviewId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/auth/reviews/my-reviews")
    @ApiOperation(value = "내가 쓴 리뷰 목록 조회", notes = "<b>(로그인 필요)</b> 지금까지 내가 썼던 향수 리뷰 목록을 조회하는 API 입니다.")
    public ResponseEntity<ReviewPageResponse> viewMyReviewPage(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(reviewService.getMyReviewPage(email, pageable));
    }

    @GetMapping("/auth/reviews/my-reviews/perfumes/{perfume_id}")
    @ApiOperation(value = "내가 쓴 특정 향수의 리뷰 조회", notes = "<b>(로그인 필요)</b> 내가 썼던 특정 향수의 리뷰를 조회하는 API 입니다.")
    @ApiImplicitParam(name = "perfume_id", value = "리뷰를 불러올 향수 ID", required = true)
    public ResponseEntity<ReviewResponse> viewMyReviewPage(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "perfume_id") Long perfumeId) {
        return ResponseEntity.ok().body(reviewService.getMyPerfumeReview(email, perfumeId));
    }

    @PostMapping("/auth/reviews/likes/{review_id}")
    @ApiOperation(value = "리뷰 좋아요 누르기", notes = "<b>(로그인 필요)</b> 특정 리뷰에 좋아요를 할 수 있는 API 입니다.")
    @ApiImplicitParam(name = "review_id", value = "좋아할 리뷰 ID", required = true)
    public ResponseEntity<Void> likeReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId) {
        Long newReviewLikeId = reviewService.likeReview(email, reviewId);
        URI uri = URI.create("/api/reviews/" + reviewId + "/" + newReviewLikeId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/auth/reviews/likes/{review_id}")
    @ApiOperation(value = "리뷰 좋아요 여부 조회", notes = "<b>(로그인 필요)</b> 자신이 특정 리뷰에 좋아요 했는지 확인하는 API 입니다.")
    @ApiImplicitParam(name = "review_id", value = "좋아요 여부를 확인할 리뷰 ID", required = true)
    public ResponseEntity<ReviewLikeResponse> isLikeThisReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId) {
        return ResponseEntity.ok().body(reviewService.isLikeThisReview(email, reviewId));
    }

    @DeleteMapping("/auth/reviews/likes/{review_id}")
    @ApiOperation(value = "리뷰 좋아요 취소", notes = "<b>(로그인 필요)</b> 특정 리뷰에 좋아요를 취소하는 API 입니다.")
    @ApiImplicitParam(name = "review_id", value = "좋아요 취소할 리뷰 ID", required = true)
    public ResponseEntity<Void> notLikeThisReviewAnymore(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId) {
        reviewService.notLikeThisReviewAnymore(email, reviewId);
        return ResponseEntity.noContent().build();
    }
}
