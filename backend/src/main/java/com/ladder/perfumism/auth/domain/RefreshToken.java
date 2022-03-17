package com.ladder.perfumism.auth.domain;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
public class RefreshToken {

    @Id
    @Column(name = "email")
    private String key;

    @Column(name = "token")
    private String value;

    protected RefreshToken() {
    }

    @Builder
    public RefreshToken(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public RefreshToken updateToken(String token) {
        this.value = token;
        return this;
    }

    public void validateValue(String refreshToken) {
        if(!value.equals(refreshToken)) {
            throw new BusinessException(ErrorCode.INVALID_NOT_MATCH_BY_REFRESH_TOKEN);
        }
    }
}
