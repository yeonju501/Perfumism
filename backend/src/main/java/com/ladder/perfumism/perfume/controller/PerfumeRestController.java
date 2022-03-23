package com.ladder.perfumism.perfume.controller;

import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.service.PerfumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
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
    @ApiImplicitParam(name = "perfume_id", value = "향수 ID", required = true)
    public ResponseEntity<PerfumeDetailResponse> viewDetailPerfume(@PathVariable(value = "perfume_id") Long perfumeId) {
        return ResponseEntity.ok().body(perfumeService.viewDetailPerfume(perfumeId));
    }

    @GetMapping("/perfumes")
    @ApiOperation(value = "향수 목록", notes = "향수 목록 API 입니다.")
    public ResponseEntity<PerfumeListResponse> normalPerfumeList(Pageable pageable) {
        return ResponseEntity.ok().body(perfumeService.normalPerfumeList(pageable));
    }
}