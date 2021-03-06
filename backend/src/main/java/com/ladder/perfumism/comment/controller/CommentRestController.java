package com.ladder.perfumism.comment.controller;

import com.ladder.perfumism.comment.controller.request.CommentCreateRequest;
import com.ladder.perfumism.comment.controller.response.CommentMyReadListResponse;
import com.ladder.perfumism.comment.controller.response.CommentReadListResponse;
import com.ladder.perfumism.comment.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
@RequestMapping("/api/auth/comments")
@Api(tags = {"댓글"})
public class CommentRestController {

    private final CommentService commentService;

    public CommentRestController(CommentService commentService){
        this.commentService = commentService;
    }

    @PostMapping("/{article_id}")
    @ApiOperation(value = "댓글 작성", notes = "<b>(로그인 필요)</b> 댓글 작성 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)")
    })
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<Void> postComment(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @RequestBody CommentCreateRequest request,
        @PathVariable(value = "article_id")Long articleId){

        commentService.createComment(email,articleId,request);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{article_id}")
    @ApiOperation(value = "댓글 조회", notes = "<b>(로그인 필요)</b> 댓글 조회 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)")
    })
    @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true)
    public ResponseEntity<CommentReadListResponse> getCommentList(
        @PageableDefault(sort = "id", direction = Direction.DESC)Pageable pageable,
        @PathVariable(value = "article_id") Long articleId){

        return ResponseEntity.ok().body(commentService.showCommentList(pageable,articleId));

    }

    @PutMapping("/{article_id}/update/{comment_id}")
    @ApiOperation(value = "댓글 수정", notes = "<b>(로그인 필요)</b> 댓글 수정 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)\n"
            + "댓글이 존재하지 않을 때(I01)"),
        @ApiResponse(code = 400, message = "BAD_REQUEST\n자신이 쓴 댓글이 아닐 때(I02)")
    })
    @ApiImplicitParams({
        @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true),
        @ApiImplicitParam(name = "comment_id", value = "댓글 ID", required = true)
    })
    public ResponseEntity<Void> putComment(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @PathVariable(value = "comment_id") Long commentId,
        @RequestBody CommentCreateRequest request){

        commentService.updateComment(email,articleId,commentId,request);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{article_id}/delete/{comment_id}")
    @ApiOperation(value = "댓글 삭제", notes = "<b>(로그인 필요)</b> 댓글 삭제 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)\n"
            + "댓글이 존재하지 않을 때(I01)"),
        @ApiResponse(code = 400, message = "BAD_REQUEST\n자신이 쓴 댓글이 아닐 때(I02)")
    })
    @ApiImplicitParams({
        @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true),
        @ApiImplicitParam(name = "comment_id", value = "댓글 ID", required = true)
    })
    public ResponseEntity<Void> deleteComment(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @PathVariable(value = "comment_id") Long commentId){

        commentService.removeComment(email,articleId,commentId);

        return ResponseEntity.noContent().build();
    }

    // 대댓글
    @PostMapping("/{article_id}/reply/{comment_id}")
    @ApiOperation(value = "대댓글 작성", notes = "<b>(로그인 필요)</b> 대댓글 작성 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)\n"
            + "댓글이 존재하지 않을 때(I01)")
    })
    @ApiImplicitParams({
        @ApiImplicitParam(name = "article_id", value = "게시글 ID", required = true),
        @ApiImplicitParam(name = "comment_id", value = "댓글 ID", required = true)
    })
    public ResponseEntity<Void> postCommentReply(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @PathVariable(value = "comment_id") Long commentId,
        @RequestBody CommentCreateRequest request){

        commentService.createCommentReply(email, articleId, commentId, request);

        return ResponseEntity.noContent().build();

    }

    @GetMapping("/members")
    @ApiOperation(value = "내 댓글 조회", notes = "<b>(로그인 필요)</b> 내 댓글 조회 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)")
    })
    public ResponseEntity<CommentMyReadListResponse> getMyComment(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable){

        return ResponseEntity.ok().body(commentService.showMyCommentList(email, pageable));
    }

}
