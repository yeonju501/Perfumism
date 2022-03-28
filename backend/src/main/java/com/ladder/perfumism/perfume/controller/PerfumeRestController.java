package com.ladder.perfumism.perfume.controller;

import com.ladder.perfumism.perfume.controller.dto.response.BrandListResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.service.PerfumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"향수"})
public class PerfumeRestController {

    private final PerfumeService perfumeService;

    public PerfumeRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @GetMapping("/perfumes/{perfume_id}")
    @ApiOperation(value = "향수 상세 정보", notes = "단일 향수 상세 정보를 조회하는 API 입니다.")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n향수 ID가 존재하지 않을 때(S01)")
    })
    @ApiImplicitParam(name = "perfume_id", value = "향수 ID", required = true)
    public ResponseEntity<PerfumeDetailResponse> viewDetailPerfume(@PathVariable(value = "perfume_id") Long perfumeId) {
        return ResponseEntity.ok().body(perfumeService.viewDetailPerfume(perfumeId));
    }

    @GetMapping("/perfumes")
    @ApiOperation(value = "향수 목록", notes = "향수 목록 API 입니다.\n"
        + "(가능한 sort column: id, name, totalSurvey, totalLike... etc)")
    public ResponseEntity<PerfumeListResponse> viewPerfumeList(Pageable pageable) {
        return ResponseEntity.ok().body(perfumeService.getPerfumeList(pageable));
    }

    @GetMapping("/perfumes/brands")
    @ApiOperation(value = "브랜드 목록", notes = "브랜드 목록 API 입니다.\n(가능한 sort column: id, name)")
    public ResponseEntity<BrandListResponse> viewBrandList(Pageable pageable) {
        return ResponseEntity.ok().body(perfumeService.getBrandList(pageable));
    }

    @GetMapping("/perfumes/monthly/forced-refresh")
    @ApiOperation(value = "이달의 향수 목록 강제 새로 고침", notes = "이달의 향수 목록을 강제로 새로고침하는 API 입니다.")
    public ResponseEntity<Void> forcedRefreshMonthlyPerfumeList() {
        perfumeService.refreshingMonthlyPerfumeList();
        return ResponseEntity.ok().build();
    }
}