package com.ladder.perfumism.member.service;

import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final MemberService memberService;

    public ProfileService(MemberService memberService) {
        this.memberService = memberService;
    }
}
