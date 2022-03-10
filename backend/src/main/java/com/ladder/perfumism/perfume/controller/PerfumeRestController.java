package com.ladder.perfumism.perfume.controller;

import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.service.PerfumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @ApiOperation(value = "향수 상세 정보", notes = "단일 향수 상세 정보를 조회하는 API 입니다.")
    @GetMapping("/perfumes/{perfume_id}")
    public ResponseEntity<PerfumeDetailResponse> viewDetailPerfume(@PathVariable(value = "perfume_id") Long perfumeId) {
        return ResponseEntity.ok().body(perfumeService.viewDetailPerfume(perfumeId));
    }
}