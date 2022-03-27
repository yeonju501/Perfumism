package com.ladder.perfumism.notification.controller;

import com.ladder.perfumism.notification.controller.dto.response.NotificationResponse;
import com.ladder.perfumism.notification.service.NotificationService;
import io.swagger.annotations.Api;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<List<NotificationResponse>> showAllNotifications(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(notificationService.showAllNotifications(email));
    }
}
