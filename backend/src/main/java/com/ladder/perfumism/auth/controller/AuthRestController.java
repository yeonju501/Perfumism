package com.ladder.perfumism.auth.controller;

import com.ladder.perfumism.auth.controller.dto.request.LoginRequest;
import com.ladder.perfumism.auth.controller.dto.request.TokenRequest;
import com.ladder.perfumism.auth.controller.dto.response.AccessTokenResponse;
import com.ladder.perfumism.auth.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"로그인"})
public class AuthRestController {

    private final AuthService authService;

    public AuthRestController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/members/login")
    @ApiOperation(value = "로그인", notes = "로그인 API")
    public ResponseEntity<AccessTokenResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {

        return ResponseEntity.ok().body(authService.login(request, response));
    }

    @PostMapping("/members/reissue")
    @ApiOperation(value = "토큰 재발급", notes = "토큰 재발급 API")
    public ResponseEntity<AccessTokenResponse> reissue(@RequestBody TokenRequest request, HttpServletResponse response) {
        return ResponseEntity.ok().body(authService.reissue(request, response));
    }
}
