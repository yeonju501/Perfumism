package com.ladder.perfumism.article.controller;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadDetailResponse;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadListResponse;
import com.ladder.perfumism.article.service.ArticleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
@Api(tags = {"게시글"})
public class ArticleRestController {

    private final ArticleService articleService;

    public ArticleRestController(ArticleService articleService){
        this.articleService = articleService;
    }

    @PostMapping
    @ApiOperation(value = "게시글 작성", notes = "게시글을 작성 API")
        public ResponseEntity<Void> createArticle(@RequestBody ArticleCreateRequest request){

        articleService.articleCreate(request);
        URI uri = URI.create("api/articles/create");

        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    @ApiOperation(value = "게시글 목록 조회", notes = "게시글 목록을 받아오는 API")
    public ResponseEntity<ArticleReadListResponse> getArticleList(
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable){
        return ResponseEntity.ok().body(articleService.showArticleList(pageable));
    }

    @GetMapping("/{article_id}")
    @ApiOperation(value = "게시글 상세 조회", notes = "게시글을 선택했을 때 선택한 게시글을 받아오는 API")
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<ArticleReadDetailResponse> getArticleDetail(@PathVariable(value = "article_id") Long articleId) {
        return ResponseEntity.ok().body(articleService.showArticleDetail(articleId));
    }

    @PutMapping("/{article_id}")
    @ApiOperation(value = "게시글 수정", notes = "게시글 수정요청을 하는 API")
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<Void> updateArticle(@PathVariable(value = "article_id") Long articleId, @RequestBody ArticleCreateRequest request){

        articleService.updateArticle(articleId, request);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{article_id}")
    @ApiOperation(value = "게시글 (임시) 삭제", notes = "게시글 삭제 요청 API (회원 연결 후 로직 변경 예정)")
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<Void> deleteArticle(@PathVariable(value = "article_id") Long articleId){
        articleService.deleteArticle(articleId);

        return ResponseEntity.noContent().build();
    }
}
