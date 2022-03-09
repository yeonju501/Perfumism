package com.ladder.perfumism.global.config;

import com.ladder.perfumism.auth.infrastructure.JwtTokenProvider;
import com.ladder.perfumism.global.security.JwtExceptionFilter;
import com.ladder.perfumism.global.security.JwtFilter;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtSecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void configure(HttpSecurity http) {
        JwtFilter jwtFilter = new JwtFilter(jwtTokenProvider);
        JwtExceptionFilter jwtExceptionFilter = new JwtExceptionFilter();
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtExceptionFilter, JwtFilter.class);
    }
}
