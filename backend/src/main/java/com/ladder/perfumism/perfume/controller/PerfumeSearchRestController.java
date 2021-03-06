package com.ladder.perfumism.perfume.controller;

import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.service.PerfumeSearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"향수 검색"})
public class PerfumeSearchRestController {

    private final PerfumeSearchService perfumeSearchService;

    public PerfumeSearchRestController(PerfumeSearchService perfumeSearchService) {
        this.perfumeSearchService = perfumeSearchService;
    }

    @GetMapping("/perfumes/search")
    @ApiOperation(value = "항수 검색", notes = "향수 타입별 검색 API 입니다.\n"
        + "가능한 검색 타입: name(기본값), brand, accord\n"
        + "정렬은 기본적으로 id 순으로 정렬되어있습니다.\n"
        + "name: 향수 이름으로 검색합니다.\n"
        + "brand: 이 브랜드의 향수를 검색합니다.\n"
        + "accord: 이 향을 가진 향수를 검색합니다.")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD_REQUEST\n검색어가 2글자 미만일 때(T01)"),
        @ApiResponse(code = 404, message = "NOT_FOUND\n검색 타입이 존재하지 않을 때(T02)")
    })
    @ApiImplicitParams({
        @ApiImplicitParam(name = "type", value = "검색 타입 (name(기본값), brand, accord)"),
        @ApiImplicitParam(name = "keyword", value = "검색어 (2글자 이상)")
    })
    public ResponseEntity<PerfumeListResponse> searchPerfume(Pageable pageable,
        @RequestParam(value = "type", defaultValue = "name") String type,
        @RequestParam(value = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok().body(perfumeSearchService.getPerfumeSearch(pageable, type, keyword));
    }

    @GetMapping("/perfumes/search-all")
    @ApiOperation(value = "항수 통합 검색", notes = "향수 통합 검색 API 입니다.\n"
        + "이 검색 API는 향수명, 브랜드명, 어코드 모두 검색합니다.")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD_REQUEST\n검색어가 2글자 미만일 때(T01)")
    })
    @ApiImplicitParam(name = "keyword", value = "검색어 (2글자 이상)")
    public ResponseEntity<PerfumeListResponse> searchAllPerfume(Pageable pageable,
        @RequestParam(value = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok().body(perfumeSearchService.getPerfumeSearchAll(pageable, keyword));
    }
}
