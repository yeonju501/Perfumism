package com.ladder.perfumism.member.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class PasswordCode {

    @Id
    @Column(name = "code_id")
    private String id;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @Column(name = "expired")
    private Boolean expired;

    @Column(name = "user_id")
    private Long userId;

    public PasswordCode() {
    }

    @Builder
    public PasswordCode(String id, LocalDateTime expirationDate, Boolean expired, Long userId){
        this.id = id;
        this.expirationDate = expirationDate;
        this.expired = expired;
        this.userId = userId;
    }

    public void useCode() {
        expired = true;
    }
}
