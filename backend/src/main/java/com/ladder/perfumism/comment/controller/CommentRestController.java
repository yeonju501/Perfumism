package com.ladder.perfumism.comment.controller;

import com.ladder.perfumism.comment.controller.request.CommentCreateRequest;
import com.ladder.perfumism.comment.controller.response.CommentReadListResponse;
import com.ladder.perfumism.comment.service.CommentService;
import com.sun.jndi.toolkit.url.Uri;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/comment/{article_id}")
@Api(tags = {"댓글"})
public class CommentRestController {

    private final CommentService commentService;

    public CommentRestController(CommentService commentService){
        this.commentService = commentService;
    }

    @PostMapping
    @ApiOperation(value = "댓글 작성", notes = "<b>(로그인 필요)</b> 댓글 작성 API")
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<Void> postComment(
        @AuthenticationPrincipal String email,
        @RequestBody CommentCreateRequest request,
        @PathVariable(value = "article_id")Long articleId){

        commentService.commentCreate(email,articleId,request);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @ApiOperation(value = "댓글 조회", notes = "<b>(로그인 필요)</b> 댓글 조회 API")
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<CommentReadListResponse> getCommentList(
        @AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Direction.DESC)Pageable pageable,
        @PathVariable(value = "article_id") Long articleId){

        return ResponseEntity.ok().body(commentService.showCommentList(email,pageable,articleId));

    }

    @PutMapping("/update/{comment_id}")
    @ApiOperation(value = "댓글 수정", notes = "<b>(로그인 필요)</b> 댓글 수정 API")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true),
        @ApiImplicitParam(name = "comment_id", value = "댓글 ID", required = true)
    })
    public ResponseEntity<Void> putComment(
        @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @PathVariable(value = "comment_id") Long commentId,
        @RequestBody CommentCreateRequest request){

        commentService.updateComment(email,articleId,commentId,request);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{comment_id}")
    @ApiOperation(value = "댓글 삭제", notes = "<b>(로그인 필요)</b> 댓글 삭제 API")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true),
        @ApiImplicitParam(name = "comment_id", value = "댓글 ID", required = true)
    })
    public ResponseEntity<Void> deleteComment(
        @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @PathVariable(value = "comment_id") Long commentId){

        commentService.deleteComment(email,articleId,commentId);

        return ResponseEntity.noContent().build();
    }

    // 대댓글
    @PostMapping("/reply/{comment_id}")
    @ApiOperation(value = "대댓글 작성", notes = "<b>(로그인 필요)</b> 대댓글 작성 API")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true),
        @ApiImplicitParam(name = "comment_id", value = "댓글 ID", required = true)
    })
    public ResponseEntity<Void> postCommentReply(
        @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @PathVariable(value = "comment_id") Long commentId,
        @RequestBody CommentCreateRequest request){

        commentService.createCommentReply(email, articleId, commentId, request);

        return ResponseEntity.noContent().build();

    }
}
