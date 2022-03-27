package com.ladder.perfumism.notification.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class NotificationCountResponse {

    @JsonProperty("unread_count")
    @ApiModelProperty(notes = "안읽은 알림 개수", example = "1")
    private Integer unreadCount;

    public NotificationCountResponse() {
    }

    public NotificationCountResponse(Integer unreadCount) {
        this.unreadCount = unreadCount;
    }

    public static NotificationCountResponse from(int unreadCount) {
        return new NotificationCountResponse(
            unreadCount
        );
    }
}
