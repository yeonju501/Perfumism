package com.ladder.perfumism.auth.service;

import com.ladder.perfumism.auth.controller.dto.request.LoginRequest;
import com.ladder.perfumism.auth.controller.dto.response.TokenResponse;
import com.ladder.perfumism.auth.domain.RefreshToken;
import com.ladder.perfumism.auth.domain.RefreshTokenRepository;
import com.ladder.perfumism.auth.infrastructure.JwtTokenProvider;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthService(MemberRepository memberRepository,
        PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider,
        RefreshTokenRepository refreshTokenRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public TokenResponse login(LoginRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        member.login(passwordEncoder, request.getPassword());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());
        saveRefreshToken(member, tokenResponse);
        return tokenResponse;
    }

    private void saveRefreshToken(Member member, TokenResponse tokenResponse) {
        RefreshToken refreshToken = RefreshToken.builder()
            .key(member.getEmail())
            .value(tokenResponse.getRefreshToken())
            .build();
        refreshTokenRepository.save(refreshToken);
    }
}
