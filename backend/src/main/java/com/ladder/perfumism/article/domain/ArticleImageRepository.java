package com.ladder.perfumism.article.domain;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleImageRepository extends JpaRepository<ArticleImage, Long> {

    List<ArticleImage> findByArticle(Article article);

    @Modifying
    @Query(nativeQuery = true, value = "update article_image ai "
        + "set ai.deleted_at = current_timestamp "
        + "where ai.article_id = (:article_id)")
    Integer updateDeletedAtByArticle(@Param("article_id") Long article_id);
}
