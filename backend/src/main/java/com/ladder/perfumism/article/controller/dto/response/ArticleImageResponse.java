package com.ladder.perfumism.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.article.domain.ArticleImage;
import com.ladder.perfumism.global.domain.BaseEntity;
import lombok.Getter;

@Getter
public class ArticleImageResponse extends BaseEntity {

    @JsonProperty("article_image_id")
    private Long articleImageId;

    @JsonProperty("image_url")
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
