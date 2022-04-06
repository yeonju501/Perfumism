package com.ladder.perfumism.member.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.controller.dto.request.ChangePasswordRequest;
import com.ladder.perfumism.member.controller.dto.request.CheckDuplicateRequest;
import com.ladder.perfumism.member.controller.dto.request.FindPasswordRequest;
import com.ladder.perfumism.member.controller.dto.request.MemberSaveRequest;
import com.ladder.perfumism.member.controller.dto.response.CheckDuplicateResponse;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.member.domain.PasswordCode;
import com.ladder.perfumism.member.domain.PasswordCodeRepository;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final PasswordCodeRepository passwordCodeRepository;

    private static final int EXPIRATION_PERIOD = 5;

    public MemberService(MemberRepository memberRepository,
        PasswordEncoder passwordEncoder, MailService mailService,
        PasswordCodeRepository passwordCodeRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.passwordCodeRepository = passwordCodeRepository;
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

    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
    }

    @Transactional
    public void findPassword(FindPasswordRequest request) {
        Member member = findByEmail(request.getEmail());
        String code = mailService.randomCode();
        mailService.sendMailChangePassword(member, code);
        PasswordCode passwordCode = PasswordCode.builder()
            .id(code)
            .expirationDate(LocalDateTime.now().plusMinutes(EXPIRATION_PERIOD))
            .expired(false)
            .userId(member.getId())
            .build();
        passwordCodeRepository.save(passwordCode);
    }

    @Transactional
    public CheckDuplicateResponse checkPasswordCode(CheckDuplicateRequest request) {
        Boolean result = passwordCodeRepository.existsByIdAndExpirationDateAfterAndExpiredIsFalse(request.getValue(), LocalDateTime.now());
        if (result) {
            PasswordCode passwordCode = passwordCodeRepository.findById(request.getValue())
                .orElseThrow(() -> new BusinessException(ErrorCode.PASSWORD_CODE_NOT_FOUND_BY_ID));
            passwordCode.useCode();
        }
        return CheckDuplicateResponse.from(result);
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkDuplicateEmail(CheckDuplicateRequest request) {
        return CheckDuplicateResponse.from(memberRepository.existsByEmail(request.getValue()));
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkDuplicateUsername(CheckDuplicateRequest request) {
        return CheckDuplicateResponse.from(memberRepository.existsByUsername(request.getValue()));
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        member.changePassword(passwordEncoder, request.getPassword());
    }

    public void checkDuplicateEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new BusinessException(ErrorCode.MEMBER_EMAIL_DUPLICATED);
        }
    }

    public void checkDuplicateUsername(String username) {
        if (memberRepository.existsByUsername(username)) {
            throw new BusinessException(ErrorCode.MEMBER_USERNAME_DUPLICATED);
        }
    }
}
