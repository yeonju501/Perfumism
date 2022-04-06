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
import com.ladder.perfumism.member.controller.dto.request.ChangePasswordRequest;
import com.ladder.perfumism.member.controller.dto.request.CheckDuplicateRequest;
import com.ladder.perfumism.member.controller.dto.request.MemberSaveRequest;
import com.ladder.perfumism.member.controller.dto.response.CheckDuplicateResponse;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.member.util.MemberFixture;
import java.util.Optional;
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

    private String NEW_PASSWORD = "NewPassword1!";

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

    @Test
    @DisplayName("회원탈퇴 시 deleted_at이 갱신된다.")
    void resignMemberTest() {
        // setup & given
        Member member = memberSaveRequest.toMember();
        when(memberRepository.findByEmail(any())).thenReturn(Optional.ofNullable(member));

        // when
        memberService.resignMember(EMAIL);

        // then
        assertThat(member.getDeletedAt()).isNotNull();
    }

    @Test
    @DisplayName("존재하지 않는 회원을 조회하면 ErrorCode C01이 발생한다.")
    void findByEmailMemberNotFoundByEmailExceptionTest(){
        given(memberRepository.findByEmail(any())).willThrow(new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));

        assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> memberService.findByEmail(EMAIL))
            .withMessageMatching(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL.getMessage());
    }

    @Test
    @DisplayName("이메일로 회원을 조회할 수 있다.")
    void findByEmailTest() {
        // setup & given
        Member member = memberSaveRequest.toMember();
        given(memberRepository.findByEmail(any())).willReturn(Optional.ofNullable(member));

        // when
        Member testMember = memberService.findByEmail(EMAIL);

        // then
        assertThat(testMember.getUsername()).isEqualTo(USERNAME);
    }

    @Test
    @DisplayName("이메일이 중복되었을 경우 true를 반환한다.")
    void checkDuplicateEmailTest() {
        // setup & given
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(true);
        CheckDuplicateRequest checkDuplicateRequest = new CheckDuplicateRequest(EMAIL);

        // when
        CheckDuplicateResponse checkDuplicateResponse = memberService.checkDuplicateEmail(checkDuplicateRequest);

        // then
        assertThat(checkDuplicateResponse.getResult()).isEqualTo(true);
    }

    @Test
    @DisplayName("유저네임이 중복되었을 경우 true를 반환한다.")
    void checkDuplicateUsernameTest() {
        // setup & given
        when(memberRepository.existsByUsername(USERNAME)).thenReturn(true);
        CheckDuplicateRequest checkDuplicateRequest = new CheckDuplicateRequest(USERNAME);

        // when
        CheckDuplicateResponse checkDuplicateResponse = memberService.checkDuplicateUsername(checkDuplicateRequest);

        // then
        assertThat(checkDuplicateResponse.getResult()).isEqualTo(true);
    }

//    @Test
//    @DisplayName("패스워드를 변경할 수 있다")
//    void changePasswordTest() {
//        // setup & given
//        Member member = memberSaveRequest.toMember();
//        given(memberRepository.findByEmail(any())).willReturn(Optional.ofNullable(member));
//        ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest(EMAIL, NEW_PASSWORD);
//
//        // when
//        memberService.changePassword(changePasswordRequest);
//
//        // then
//        assertThat(member.getPassword()).isEqualTo(NEW_PASSWORD);
//    }
}
