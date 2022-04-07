package com.ladder.perfumism.member.service;

import com.ladder.perfumism.member.controller.dto.request.CheckDuplicateRequest;
import com.ladder.perfumism.member.controller.dto.request.MemberUpdateRequest;
import com.ladder.perfumism.member.controller.dto.response.MemberInfoResponse;
import com.ladder.perfumism.member.domain.Member;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    public ProfileService(MemberService memberService, PasswordEncoder passwordEncoder) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse showMemberInfo(String email) {
        Member member = memberService.findByEmail(email);
        return MemberInfoResponse.from(member);
    }

    @Transactional(readOnly = true)
    public void checkPassword(String email, CheckDuplicateRequest request) {
        Member member = memberService.findByEmail(email);
        member.login(passwordEncoder, request.getValue());
    }

    @Transactional
    public void changePassword(String email, CheckDuplicateRequest request) {
        Member member = memberService.findByEmail(email);
        member.changePassword(passwordEncoder, request.getValue());
    }

    @Transactional
    public void changeProfileImage(String email, String url) {
        Member member = memberService.findByEmail(email);
        member.changeImage(url);
    }

    @Transactional
    public void changeUsername(String email, CheckDuplicateRequest request) {
        Member member = memberService.findByEmail(email);
        member.changeUsername(request.getValue());
    }

    @Transactional
    public void changeMemberInfo(String email, MemberUpdateRequest request) {
        Member member = memberService.findByEmail(email);
        if (!member.getUsername().equals(request.getUsername())) {
            memberService.checkDuplicateUsername(request.getUsername());
            member.changeUsername(request.getUsername());
        }
        member.changeGender(request.getGender());
    }
}
