package com.ladder.perfumism.vote.domain;

import com.ladder.perfumism.article.domain.Article;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote,Long> {

    Optional<Vote> findByArticle(Article article);

    @Modifying
    @Query(nativeQuery = true, value = "update vote v "
        + "set v.deleted_at = current_timestamp "
        + "where v.article_id = (:article_id)")
    Integer updateDeletedAtByArticle(@Param("article_id") Long article_id);
}
