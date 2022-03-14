package com.ladder.perfumism.perfume.controller;

import com.ladder.perfumism.perfume.controller.dto.request.ReviewWriteRequest;
import com.ladder.perfumism.perfume.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/reviews/perfumes/{perfume_id}")
    @ApiOperation(value = "특정 향수에 리뷰와 평점 등록", notes = "<b>(로그인 필요)</b> 특정 향수에 리뷰와 평점을 등록하는 API 입니다.")
    @ApiImplicitParam(name = "perfume_id", value = "리뷰를 등록할 향수 ID", required = true)
    public ResponseEntity<Void> createReview(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @RequestBody ReviewWriteRequest request,
        @PathVariable(value = "perfume_id") Long perfumeId) {
        Long newReviewId = reviewService.writeReview(request, email, perfumeId);
        URI uri = URI.create("/api/reviews/" + perfumeId + "/" + newReviewId);
        return ResponseEntity.created(uri).build();
    }
}
