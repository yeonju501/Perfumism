package com.ladder.perfumism.member.controller;

import com.ladder.perfumism.image.ImageUploader;
import com.ladder.perfumism.member.controller.dto.request.ChangePasswordRequest;
import com.ladder.perfumism.member.controller.dto.request.CheckDuplicateRequest;
import com.ladder.perfumism.member.controller.dto.request.FindPasswordRequest;
import com.ladder.perfumism.member.controller.dto.request.MemberSaveRequest;
import com.ladder.perfumism.member.controller.dto.response.CheckDuplicateResponse;
import com.ladder.perfumism.member.service.MemberDeleteService;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.member.service.ProfileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"회원"})
public class MemberRestController {

    private final MemberService memberService;
    private final MemberDeleteService memberDeleteService;

    public MemberRestController(MemberService memberService,
        MemberDeleteService memberDeleteService) {
        this.memberService = memberService;
        this.memberDeleteService = memberDeleteService;
    }

    @PostMapping("/members/join")
    @ApiOperation(value = "회원가입", notes = "회원 가입 api")
    public ResponseEntity<Void> join(@RequestBody MemberSaveRequest request) {
        Long joinMemberId = memberService.saveMember(request);
        URI uri = URI.create("/api/members/" + joinMemberId);
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/members/find-pw")
    @ApiOperation(value = "비밀번호 변경 메일 전송", notes = "비밀번호 변경 메일 전송 api")
    public ResponseEntity<Void> findPassword(@RequestBody FindPasswordRequest request) {
        memberService.findPassword(request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/members/code")
    @ApiOperation(value = "인증 번호 확인", notes = "비밀번호 변경 인증번호 확인 api")
    public ResponseEntity<CheckDuplicateResponse> checkPasswordCode(@RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(memberService.checkPasswordCode(request));
    }

    @PutMapping("/members/change-pw")
    @ApiOperation(value = "비밀번호 변경", notes = "비밀번호 변경 api")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest request){
        memberService.changePassword(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/members/exist-email")
    @ApiOperation(value = "이메일 중복검사", notes = "이메일 중복 검사 api")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicateEmail(@RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(memberService.checkDuplicateEmail(request));
    }

    @PostMapping("/members/exist-username")
    @ApiOperation(value = "유저네임 중복검사", notes = "유저네임 중복 검사 api")
    public ResponseEntity<CheckDuplicateResponse> checkDulicateUsername(@RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(memberService.checkDuplicateUsername(request));
    }

    @DeleteMapping("/auth/members")
    @ApiOperation(value = "회원탈퇴", notes = "회원 탈퇴 api")
    public ResponseEntity<Void> resignMember(@ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        memberDeleteService.resignMember(email);
        return ResponseEntity.noContent().build();
    }
}
