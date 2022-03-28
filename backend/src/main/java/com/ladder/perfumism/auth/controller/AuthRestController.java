package com.ladder.perfumism.auth.controller;

import com.ladder.perfumism.auth.controller.dto.request.LoginRequest;
import com.ladder.perfumism.auth.controller.dto.request.ReissueRequest;
import com.ladder.perfumism.auth.service.AuthService;
import com.ladder.perfumism.auth.service.OAuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"로그인"})
public class AuthRestController {

    private final AuthService authService;
    private final OAuthService oAuthService;

    public AuthRestController(AuthService authService, OAuthService oAuthService) {
        this.authService = authService;
        this.oAuthService = oAuthService;
    }

    @PostMapping("/members/login")
    @ApiOperation(value = "로그인", notes = "로그인 API")
    public ResponseEntity<Void> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        authService.login(request, response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/members/reissue")
    @ApiOperation(value = "토큰 재발급", notes = "(로그인 필요) 토큰 재발급 API")
    public ResponseEntity<Void> reissue(@RequestBody ReissueRequest tokenRequest, HttpServletResponse response) {
        authService.reissue(tokenRequest, response);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/oauth2/authorization/google")
    @ApiOperation(value = "구글 로그인", notes = "구글 로그인 API")
    public ResponseEntity<Void> getGoogleCode(@RequestParam String code, HttpServletResponse response) {
        oAuthService.oauth2AuthorizationGoogle(code, response);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/oauth2/authorization/kakao")
    @ApiOperation(value = "카카오 로그인", notes = "카카오 로그인 API")
    public ResponseEntity<Void> getKakaoCode(@RequestParam String code, HttpServletResponse response) {
        oAuthService.oauth2AuthorizationKakao(code, response);
        return ResponseEntity.noContent().build();
    }
}
