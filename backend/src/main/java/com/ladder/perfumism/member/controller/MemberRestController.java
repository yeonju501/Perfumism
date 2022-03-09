package com.ladder.perfumism.member.controller;

import com.ladder.perfumism.member.controller.dto.request.MemberSaveRequest;
import com.ladder.perfumism.member.service.MemberService;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MemberRestController {

    private final MemberService memberService;

    public MemberRestController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/members/join")
    public ResponseEntity<Void> join(@RequestBody MemberSaveRequest request) {
        Long joinMemberId = memberService.saveMember(request);
        URI uri = URI.create("/api/members/" + joinMemberId);
        return ResponseEntity.created(uri).build();
    }
}
