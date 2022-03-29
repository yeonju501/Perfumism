package com.ladder.perfumism.vote.controller;

import com.ladder.perfumism.vote.controller.dto.request.VoteChooseRequest;
import com.ladder.perfumism.vote.controller.dto.request.VoteCreateRequest;
import com.ladder.perfumism.vote.controller.dto.response.VoteReadListResponse;
import com.ladder.perfumism.vote.domain.VoteItem;
import com.ladder.perfumism.vote.service.VoteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/votes/{article_id}")
@Api(tags = {"투표"})
public class VoteRestController {

    private final VoteService voteService;

    public VoteRestController(VoteService voteService){
        this.voteService = voteService;
    }

    @PostMapping
    @ApiOperation(value = "투표 만들기", notes = "<b>(로그인 필요)</b> 투표를 만드는 API")
    @ApiImplicitParam(name = "article_id", value = "투표를 생성한 게시글", required = true)
    public ResponseEntity<Void> postVote(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @RequestBody VoteCreateRequest request){

        voteService.createVote(email,articleId,request);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @ApiOperation(value = "투표 조회", notes = "<b>(로그인 필요)</b> 투표를 조회하는 API")
    @ApiImplicitParam(name = "article_id", value = "투표를 생성한 게시글", required = true)
    public ResponseEntity<VoteReadListResponse> getVote(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId){
        return ResponseEntity.ok().body(voteService.showVoteList(email,articleId));
    }

    @PutMapping
    @ApiOperation(value = "투표 만료", notes = "<b>(로그인 필요)</b> 투표 만료/재개하는 API")
    @ApiImplicitParam(name = "article_id", value = "투표를 생성한 게시글", required = true)
    public ResponseEntity<Void> putVote(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId){

        voteService.expireVote(email, articleId);

        return ResponseEntity.noContent().build();
    }

    // 투표
    @PostMapping("/choose")
    public ResponseEntity<Void> postVoteChoose(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @RequestBody VoteChooseRequest request){

        voteService.chooseVote(email,articleId, request);

        return ResponseEntity.noContent().build();
    }
}
