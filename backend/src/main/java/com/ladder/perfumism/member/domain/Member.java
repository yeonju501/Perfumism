package com.ladder.perfumism.member.domain;

import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "image")
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority")
    private Authority authority;

    protected Member() {
    }

    @Builder
    public Member(String email, String password, String username, Authority authority) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.authority = authority;
    }

    public static Member createMember(String email, String password, String username) {
        return Member.builder()
            .email(email)
            .password(password)
            .username(username)
            .authority(Authority.ROLE_MEMBER)
            .build();
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void login(PasswordEncoder passwordEncoder, String password) {
        if (!passwordEncoder.matches(password, this.password)) {
            throw new BusinessException(ErrorCode.MEMBER_LOGIN_ERROR_BY_PASSWORD);
        }
    }
}
