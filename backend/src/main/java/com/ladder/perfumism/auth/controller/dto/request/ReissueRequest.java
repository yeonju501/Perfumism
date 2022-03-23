package com.ladder.perfumism.auth.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ReissueRequest {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("index")
    @ApiModelProperty(notes = "index", example = "1")
    private Long id;

    public ReissueRequest() {
    }

    public ReissueRequest(String accessToken, Long id) {
        this.accessToken = accessToken;
        this.id = id;
    }
}
