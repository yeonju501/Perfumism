package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.ArticleImage;
import com.ladder.perfumism.global.domain.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ArticleImageResponse extends BaseEntity {

    @JsonProperty("article_image_id")
    @ApiModelProperty(position = 0, notes = "이미지 ID", example = "1")
    private Long articleImageId;

    @JsonProperty("image_url")
    @ApiModelProperty(position = 1, notes = "이미지 URL", example = "https://perfumism-bucket.s3.ap-northeast-2.amazonaws.com/article/2c5d46e8-e91b-4e56-a3cc-7e0e1dd6a0c5gitlabrunner.png")
    private String image_url;

    public ArticleImageResponse(Long articleImageId, String image_url){
        this.articleImageId = articleImageId;
        this.image_url = image_url;
    }

    public static ArticleImageResponse from(ArticleImage articleImage){
        return new ArticleImageResponse(
            articleImage.getId(),
            articleImage.getUrl()
        );
    }
}
