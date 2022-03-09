package com.ladder.perfumism.perfume.controller;

import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.service.PerfumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PerfumeRestController {
    private PerfumeService perfumeService;

    public PerfumeRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @GetMapping("/perfumes/{perfume_id}")
    public ResponseEntity<PerfumeDetailResponse> viewDetailPerfume(@PathVariable(value = "perfume_id") Long perfumeId){
        return ResponseEntity.ok().body(perfumeService.viewDetailPerfume(perfumeId));
    }

}
