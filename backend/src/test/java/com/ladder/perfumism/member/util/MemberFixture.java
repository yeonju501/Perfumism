package com.ladder.perfumism.member.util;

import com.ladder.perfumism.member.controller.dto.request.MemberSaveRequest;

public class MemberFixture {

    public static final String EMAIL = "email@email.com";
    public static final String PASSWORD = "PASSword123!@";
    public static final String USERNAME = "username";

    public static MemberSaveRequest createMemberSaveRequest(String email, String password, String username) {
        return new MemberSaveRequest(email, password, username);
    }
}
