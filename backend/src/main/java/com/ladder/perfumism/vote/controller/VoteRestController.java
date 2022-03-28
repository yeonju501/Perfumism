package com.ladder.perfumism.vote.controller;

import com.ladder.perfumism.vote.controller.dto.request.VoteCreateRequest;
import com.ladder.perfumism.vote.service.VoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/votes")
public class VoteRestController {

    private final VoteService voteService;

    public VoteRestController(VoteService voteService){
        this.voteService = voteService;
    }

    @PostMapping
    public ResponseEntity<Void> postVote(
        @AuthenticationPrincipal String email,
        @RequestBody VoteCreateRequest request){

//        voteService
    }
}
