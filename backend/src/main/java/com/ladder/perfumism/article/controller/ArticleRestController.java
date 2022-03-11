package com.ladder.perfumism.article.controller;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadListResponse;
import com.ladder.perfumism.article.service.ArticleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/create")
    @ApiOperation(value = "게시글 작성", notes = "게시글 작성하는 api 입니다")
        public ResponseEntity<Void> createArticle(@RequestBody ArticleCreateRequest request){

        articleService.articleCreate(request);
        URI uri = URI.create("api/articles/create");

        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/read")
    public ResponseEntity<ArticleReadListResponse> getArticleList(
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable){
        return ResponseEntity.ok().body(articleService.showArticleList(pageable));
    }
}
