package com.ladder.perfumism.article.controller;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadDetailResponse;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadListResponse;
import com.ladder.perfumism.article.domain.ArticleSubject;
import com.ladder.perfumism.article.service.ArticleService;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.image.ImageUploader;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth/articles")
@Api(tags = {"게시글"})
public class ArticleRestController {

    private final ArticleService articleService;


    public ArticleRestController(ArticleService articleService){
        this.articleService = articleService;
    }

    @PostMapping
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)")
    })
    @ApiImplicitParam(name = "article", value = "게시글 내용 example : {\"subject\":\"TALK\", \"title\":\"ㅎㅇ\", \"content\":\"ㅂㅇ\"}", required = true)
    @ApiOperation(value = "게시글 작성", notes = "<b>(로그인 필요)</b> 게시글을 작성 API", produces = "multipart/form-data")
    public ResponseEntity<Void> postArticle(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @RequestPart(value = "article") ArticleCreateRequest request,
        @RequestPart(value = "image", required = false) List<MultipartFile> files){

        Long articleId = articleService.createArticle(email,request);

        if (!files.get(0).isEmpty()){
            articleService.createArticleImage(email,articleId,files);
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = {"/{subject}","/"})
    @ApiOperation(value = "게시글 목록 조회", notes = "<b>(로그인 필요)</b> 게시글 목록을 받아오는 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)")
    })
    @ApiImplicitParam(name = "subject", value = "조회할 말 머리", defaultValue = "null")
    public ResponseEntity<ArticleReadListResponse> getArticleList(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable,
        @PathVariable(required = false) ArticleSubject subject){

        return ResponseEntity.ok().body(articleService.showArticleList(email,pageable,subject));

    }

    @GetMapping("/detail/{article_id}")
    @ApiOperation(value = "게시글 상세 조회", notes = "<b>(로그인 필요)</b> 게시글을 선택했을 때 선택한 게시글을 받아오는 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)")
    })
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<ArticleReadDetailResponse> getArticleDetail(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId) {

        return ResponseEntity.ok().body(articleService.showArticleDetail(email,articleId));

    }

    @PutMapping("/detail/{article_id}")
    @ApiOperation(value = "게시글 수정", notes = "<b>(로그인 필요)</b> 게시글 수정요청을 하는 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)"),
        @ApiResponse(code = 400, message = "BAD_REQUEST\n자신이 쓴 게시글이 아닐 때(H02)")
    })
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<Void> putArticle(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @RequestBody ArticleCreateRequest request){

        articleService.updateArticle(email,articleId, request);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/detail/{article_id}")
    @ApiOperation(value = "게시글 삭제", notes = "<b>(로그인 필요)</b> 게시글 삭제 요청 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)"),
        @ApiResponse(code = 400, message = "BAD_REQUEST\n자신이 쓴 게시글이 아닐 때(H02)")
    })
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<Void> deleteArticle(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId){

        articleService.removeArticle(email,articleId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/members")
    @ApiOperation(value = "나의 게시글 조회", notes = "<b>(로그인 필요)</b> 나의 게시글 조회 요청 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)")
    })
    public ResponseEntity<ArticleReadListResponse> getMyArticle(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable){

        ArticleSubject subject = null;

        return ResponseEntity.ok().body(articleService.showMyArticleList(email,pageable,subject));
    }
}
