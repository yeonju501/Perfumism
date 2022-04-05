package com.ladder.perfumism.member.service;

import static com.ladder.perfumism.member.util.MemberFixture.EMAIL;
import static com.ladder.perfumism.member.util.MemberFixture.PASSWORD;
import static com.ladder.perfumism.member.util.MemberFixture.USERNAME;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.controller.dto.request.MemberSaveRequest;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.member.util.MemberFixture;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MemberService memberService;

    private MemberSaveRequest memberSaveRequest;

    @BeforeEach
    void setup() {
        memberSaveRequest = MemberFixture.createMemberSaveRequest(EMAIL, PASSWORD, USERNAME);
    }

    @Test
    @DisplayName("이미 존재하는 이메일이 있을 때 로그인 요청을 할 경우 ErrorCode C04이 발생해야 한다.")
    void saveMemberExceptionDuplicatedEmailTest() {
        // setup & given
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(true);

        // when & then
        assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> memberService.saveMember(memberSaveRequest))
            .withMessageMatching(ErrorCode.MEMBER_EMAIL_DUPLICATED.getMessage());
    }

    @Test
    @DisplayName("회원가입 시 저장된 id를 반환할 수 있다.")
    void saveMemberTest() {
        // setup & given
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(false);
        Member member = memberSaveRequest.toMember();
        ReflectionTestUtils.setField(member, "id", 1L);
        when(memberRepository.save(any())).thenReturn(member);

        // when
        Long result = memberService.saveMember(memberSaveRequest);

        // then
        assertThat(result).isEqualTo(1L);
    }
}
