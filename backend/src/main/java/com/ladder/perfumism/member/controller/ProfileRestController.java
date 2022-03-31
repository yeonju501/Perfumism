package com.ladder.perfumism.member.controller;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.image.ImageUploader;
import com.ladder.perfumism.member.controller.dto.request.CheckDuplicateRequest;
import com.ladder.perfumism.member.controller.dto.request.MemberUpdateRequest;
import com.ladder.perfumism.member.controller.dto.response.MemberInfoResponse;
import com.ladder.perfumism.member.service.ProfileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@Api(tags = {"프로필"})
public class ProfileRestController {

    private final ProfileService profileService;
    private final ImageUploader imageUploader;

    public ProfileRestController(ProfileService profileService, ImageUploader imageUploader) {
        this.profileService = profileService;
        this.imageUploader = imageUploader;
    }

    @GetMapping("/auth/members")
    @ApiOperation(value = "회원 정보 조회", notes = "회원 정보 조회 api")
    public ResponseEntity<MemberInfoResponse> showMemberInfo(@ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(profileService.showMemberInfo(email));
    }

    @PostMapping("/auth/members/img")
    @ApiOperation(value = "프로필 이미지 설정", notes = "(로그인 필요) 프로필 이미지 설정 api")
    @ApiImplicitParam(name = "img", value = "img 파일", required = true)
    public ResponseEntity<Void> changeProfileImage(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @RequestPart("img")
            MultipartFile file) {
        String url = null;
        try {
            url = imageUploader.upload(file, "profile");
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.GLOBAL_ILLEGAL_ERROR);
        }
        profileService.changeProfileImage(email, url);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/members/check-pw")
    @ApiOperation(value = "비밀번호 확인", notes = "(로그인 필요) 프로필 페이지 비밀번호 확인 api")
    public ResponseEntity<Void> checkPassword(@ApiParam(hidden = true) @AuthenticationPrincipal String email, @RequestBody
        CheckDuplicateRequest request) {
        profileService.checkPassword(email, request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/auth/members/pw")
    @ApiOperation(value = "비밀번호 변경", notes = "(로그인 필요) 비밀번호 변경 api")
    public ResponseEntity<Void> changePassword(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @RequestBody CheckDuplicateRequest request) {
        profileService.changePassword(email, request);
        return ResponseEntity.noContent().build();
    }

//    @PutMapping("/auth/members/username")
//    @ApiOperation(value = "닉네임 변경", notes = "(로그인 필요) 닉네임 변경 api")
//    public ResponseEntity<Void> changeUsername(@ApiParam(hidden = true) @AuthenticationPrincipal String email, @RequestBody
//        CheckDuplicateRequest request) {
//        profileService.changeUsername(email, request);
//        return ResponseEntity.noContent().build();
//    }

    @PutMapping("/auth/members/info")
    @ApiOperation(value = "회원정보 변경", notes = "(로그인 필요) 닉네임, 성별 api")
    public ResponseEntity<Void> changeMemberInfo(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @RequestBody MemberUpdateRequest request) {
        profileService.changeMemberInfo(email, request);
        return ResponseEntity.noContent().build();
    }
}
