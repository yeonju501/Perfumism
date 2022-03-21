package com.ladder.perfumism.member.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.controller.dto.request.ChangePasswordRequest;
import com.ladder.perfumism.member.controller.dto.request.CheckDuplicateRequest;
import com.ladder.perfumism.member.controller.dto.request.FindPasswordRequest;
import com.ladder.perfumism.member.controller.dto.request.MemberSaveRequest;
import com.ladder.perfumism.member.controller.dto.response.CheckDuplicateResponse;
import com.ladder.perfumism.member.controller.dto.response.CodeResponse;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    public MemberService(MemberRepository memberRepository,
        PasswordEncoder passwordEncoder, MailService mailService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
    }

    @Transactional
    public Long saveMember(MemberSaveRequest request) {
        checkDuplicateEmail(request.getEmail());
        checkDuplicateUsername(request.getUsername());

        Member member = request.toMember();
        member.encodePassword(passwordEncoder);
        return memberRepository.save(member).getId();
    }

    @Transactional
    public void resignMember(String email) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        member.saveDeletedTime();
    }

    private void checkDuplicateEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new BusinessException(ErrorCode.MEMBER_EMAIL_DUPLICATED);
        }
    }

    private void checkDuplicateUsername(String username) {
        if (memberRepository.existsByUsername(username)) {
            throw new BusinessException(ErrorCode.MEMBER_USERNAME_DUPLICATED);
        }
    }

    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
    }

    @Transactional(readOnly = true)
    public CodeResponse findPassword(FindPasswordRequest request) {
        Member member = findByEmail(request.getEmail());
        String code = mailService.randomCode();
        mailService.sendMailChangePassword(member, code);
        return CodeResponse.from(code);
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        Member member = findByEmail(request.getEmail());
        member.changePassword(passwordEncoder, request.getPassword());
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkDuplicateEmail(CheckDuplicateRequest request) {
        return CheckDuplicateResponse.from(memberRepository.existsByEmail(request.getValue()));
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkDuplicateUsername(CheckDuplicateRequest request) {
        return CheckDuplicateResponse.from(memberRepository.existsByUsername(request.getValue()));
    }
}
