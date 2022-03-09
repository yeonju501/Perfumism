package com.ladder.perfumism.member.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
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

    protected Member() {
    }

    @Builder
    public Member(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    public static Member createMember(String email, String password, String username) {
        return Member.builder()
            .email(email)
            .password(password)
            .username(username)
            .build();
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = password;
    }
}
