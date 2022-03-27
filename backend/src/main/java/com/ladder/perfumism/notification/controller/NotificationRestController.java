package com.ladder.perfumism.notification.controller;

import com.ladder.perfumism.notification.controller.dto.response.NotificationCountResponse;
import com.ladder.perfumism.notification.controller.dto.response.NotificationResponse;
import com.ladder.perfumism.notification.service.NotificationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"알림"})
public class NotificationRestController {

    private final NotificationService notificationService;

    public NotificationRestController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/auth/notifications")
    @ApiOperation(value = "모든 알림 목록 조회", notes = "(로그인 필요) 모든 알림 목록을 조회하는 API")
    public ResponseEntity<List<NotificationResponse>> showAllNotifications(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(notificationService.showAllNotifications(email));
    }

    @GetMapping("/auth/notifications/unread")
    @ApiOperation(value = "안읽은 알림 목록 조회", notes = "(로그인 필요) 안읽은 알림 목록을 조회하는 API")
    public ResponseEntity<List<NotificationResponse>> showUnreadNotifications(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(notificationService.showUnreadNotifications(email));
    }

    @GetMapping("/auth/notifications/count-unread")
    @ApiOperation(value = "안읽은 알림 개수 조회", notes = "(로그인 필요) 안읽은 알림 개수를 조회하는 API")
    public ResponseEntity<NotificationCountResponse> showUnreadCount(
        @ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(notificationService.showUnreadCount(email));
    }

    @PutMapping("/auth/notifications/{notificationId}")
    @ApiOperation(value = "알림 확인 처리", notes = "(로그인 필요) 알림을 확인 처리하는 API")
    @ApiImplicitParam(name = "notificationId", value = "알림 ID", required = true)
    public ResponseEntity<Void> readNotification(@ApiParam(hidden = true) @AuthenticationPrincipal String email,
        @PathVariable Long notificationId) {
        notificationService.readNotification(email, notificationId);
        return ResponseEntity.noContent().build();
    }
}
