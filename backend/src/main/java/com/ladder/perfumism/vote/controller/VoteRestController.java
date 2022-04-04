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
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
    @ApiOperation(value = "투표 만들기", notes = "<b>(로그인 필요)</b> 투표 생성 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)"),
        @ApiResponse(code = 400, message = "BAD_REQUEST\n자신이 쓴 게시글이 아닐 때(H02)")
    })
    @ApiImplicitParam(name = "article_id", value = "투표를 생성한 게시글", required = true)
    public ResponseEntity<Void> postVote(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @RequestBody VoteCreateRequest request){

        voteService.createVote(email,articleId,request);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @ApiOperation(value = "투표 조회", notes = "<b>(로그인 필요)</b> 투표를 조회 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)\n"
            + "투표가 존재하지 않을 때(J01)")
    })
    @ApiImplicitParam(name = "article_id", value = "투표를 생성한 게시글", required = true)
    public ResponseEntity<VoteReadListResponse> getVote(
        @PathVariable(value = "article_id") Long articleId){
        return ResponseEntity.ok().body(voteService.showVoteList(articleId));
    }

    @PutMapping
    @ApiOperation(value = "투표 만료", notes = "<b>(로그인 필요)</b> 투표 만료/재개 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)\n"
            + "투표가 존재하지 않을 때(J01)"),
        @ApiResponse(code = 400, message = "BAD_REQUEST\n자신이 쓴 게시글이 아닐때(H02)\n자신이 만든 투표가 아닐 때(J02)")
    })
    @ApiImplicitParam(name = "article_id", value = "투표를 생성한 게시글", required = true)
    public ResponseEntity<Void> putVote(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId){

        voteService.expireVote(email, articleId);

        return ResponseEntity.noContent().build();
    }

    // 투표
    @PostMapping("/choose")
    @ApiOperation(value = "투표 선택", notes = "<b>(로그인 필요)</b> 투표 선택/재선택 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n로그인한 회원이 불분명할 때(C01)\n게시글이 존재하지 않을 때(H01)\n"
            + "투표가 존재하지 않을 때(J01)\n투표 항목이 없을 때(J03)")
    })
    @ApiImplicitParam(name = "article_id", value = "투표를 생성한 게시글", required = true)
    public ResponseEntity<Void> postVoteChoose(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable(value = "article_id") Long articleId,
        @RequestBody VoteChooseRequest request){

        voteService.chooseVote(email,articleId, request);

        return ResponseEntity.noContent().build();
    }
}
