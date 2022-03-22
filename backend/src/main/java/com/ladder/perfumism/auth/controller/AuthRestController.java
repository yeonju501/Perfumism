package com.ladder.perfumism.auth.controller;

import com.ladder.perfumism.auth.controller.dto.request.LoginRequest;
import com.ladder.perfumism.auth.controller.dto.request.RefreshTokenRequest;
import com.ladder.perfumism.auth.controller.dto.request.TokenRequest;
import com.ladder.perfumism.auth.controller.dto.response.AccessTokenResponse;
import com.ladder.perfumism.auth.service.AuthService;
import com.ladder.perfumism.auth.service.OAuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity<AccessTokenResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        return ResponseEntity.ok().body(authService.login(request, response));
    }

    @PostMapping("/members/reissue")
    @ApiOperation(value = "토큰 재발급", notes = "토큰 재발급 API")
    public ResponseEntity<AccessTokenResponse> reissue(@RequestBody RefreshTokenRequest tokenRequest, HttpServletRequest request,
        HttpServletResponse response) {
        String accessToken = request.getHeader("Authorization").split(" ")[1];
        return ResponseEntity.ok().body(authService.reissue(tokenRequest, accessToken, response));
    }

    @GetMapping("/oauth2/authorization/google")
    @ApiOperation(value = "구글 로그인", notes = "구글 로그인 API")
    public ResponseEntity<AccessTokenResponse> getGoogleCode(@RequestParam String code, HttpServletResponse response) {
        return ResponseEntity.ok().body(oAuthService.oauth2AuthorizationGoogle(code, response));
    }

    @GetMapping("/oauth2/authorization/kakao")
    @ApiOperation(value = "카카오 로그인", notes = "카카오 로그인 API")
    public ResponseEntity<AccessTokenResponse> getKakaoCode(@RequestParam String code, HttpServletResponse response) {
        return ResponseEntity.ok().body(oAuthService.oauth2AuthorizationKakao(code, response));
    }
}
