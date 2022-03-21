package com.ladder.perfumism.perfume.controller;

import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.service.PerfumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"향수"})
public class PerfumeRestController {

    private PerfumeService perfumeService;

    public PerfumeRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @GetMapping("/perfumes/{perfume_id}")
    @ApiOperation(value = "향수 상세 정보", notes = "단일 향수 상세 정보를 조회하는 API 입니다.")
    @ApiImplicitParam(name = "perfume_id", value = "향수 ID", required = true)
    public ResponseEntity<PerfumeDetailResponse> viewDetailPerfume(@PathVariable(value = "perfume_id") Long perfumeId) {
        return ResponseEntity.ok().body(perfumeService.viewDetailPerfume(perfumeId));
    }

    @PostMapping("/auth/perfumes/likes/{perfume_id}")
    @ApiOperation(value = "향수 좋아요 누르기", notes = "<b>(로그인 필요)</b> 특정 향수에 좋아요를 할 수 있는 API 입니다.")
    @ApiImplicitParam(name = "perfume_id", value = "좋아할 향수 ID", required = true)
    public ResponseEntity<Void> likePerfume(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "perfume_id") Long perfumeId) {
        Long newPerfumeLikeId = perfumeService.likePerfume(email, perfumeId);
        URI uri = URI.create("/api/perfumes/" + perfumeId + "/" + newPerfumeLikeId);
        return ResponseEntity.created(uri).build();
    }
}