package com.ladder.perfumism.comment.controller;

import com.ladder.perfumism.comment.controller.request.CommentCreateRequest;
import com.ladder.perfumism.comment.controller.response.CommentReadListResponse;
import com.ladder.perfumism.comment.service.CommentService;
import com.sun.jndi.toolkit.url.Uri;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/comment/{article_id}")
public class CommentRestController {

    private final CommentService commentService;

    public CommentRestController(CommentService commentService){
        this.commentService = commentService;
    }

    @PostMapping()
    public ResponseEntity<Void> createComment(@AuthenticationPrincipal String email,
        @RequestBody CommentCreateRequest request, @PathVariable(value = "article_id")Long articleId){
        commentService.commentCreate(email,articleId,request);

        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<CommentReadListResponse> getCommentList(
        @AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Direction.DESC)Pageable pageable,
        @PathVariable(value = "article_id") Long articleId){

        return ResponseEntity.ok().body(commentService.showCommentList(email,pageable,articleId));

    }

}
