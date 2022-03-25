package com.ladder.perfumism.review.controller;

import com.ladder.perfumism.review.controller.dto.response.ReviewLikeResponse;
import com.ladder.perfumism.review.service.ReviewLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"리뷰 좋아요"})
public class ReviewLikeRestController {

    private final ReviewLikeService reviewLikeService;

    public ReviewLikeRestController(ReviewLikeService reviewLikeService) {
        this.reviewLikeService = reviewLikeService;
    }

    @PostMapping("/auth/reviews/likes/{review_id}")
    @ApiOperation(value = "리뷰 좋아요 누르기", notes = "<b>(로그인 필요)</b> 특정 리뷰에 좋아요를 할 수 있는 API 입니다.")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n"
            + "로그인한 회원이 불분명할 때(C01)\n리뷰 ID가 존재하지 않을 때(V01)"),
        @ApiResponse(code = 409, message = "CONFLICT\n"
            + "이미 좋아요 한 리뷰일 때(V07)\n본인의 리뷰에 자추를 하려 할때(V08)")
    })
    @ApiImplicitParam(name = "review_id", value = "좋아할 리뷰 ID", required = true)
    public ResponseEntity<Void> likeReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId) {
        Long newReviewLikeId = reviewLikeService.likeReview(email, reviewId);
        URI uri = URI.create("/api/reviews/" + reviewId + "/" + newReviewLikeId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/auth/reviews/likes/{review_id}")
    @ApiOperation(value = "리뷰 좋아요 여부 조회", notes = "<b>(로그인 필요)</b> 자신이 특정 리뷰에 좋아요 했는지 확인하는 API 입니다.")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n"
            + "로그인한 회원이 불분명할 때(C01)\n리뷰 ID가 존재하지 않을 때(V01)")
    })
    @ApiImplicitParam(name = "review_id", value = "좋아요 여부를 확인할 리뷰 ID", required = true)
    public ResponseEntity<ReviewLikeResponse> isLikeThisReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId) {
        return ResponseEntity.ok().body(reviewLikeService.isLikeThisReview(email, reviewId));
    }

    @DeleteMapping("/auth/reviews/likes/{review_id}")
    @ApiOperation(value = "리뷰 좋아요 취소", notes = "<b>(로그인 필요)</b> 특정 리뷰에 좋아요를 취소하는 API 입니다.")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n"
            + "로그인한 회원이 불분명할 때(C01)\n리뷰 ID가 존재하지 않을 때(V01)\n좋아요 누른 적이 없는 리뷰일 때(V09)")
    })
    @ApiImplicitParam(name = "review_id", value = "좋아요 취소할 리뷰 ID", required = true)
    public ResponseEntity<Void> notLikeThisReviewAnymore(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "review_id") Long reviewId) {
        reviewLikeService.notLikeThisReviewAnymore(email, reviewId);
        return ResponseEntity.noContent().build();
    }
}
