package com.ladder.perfumism.comment.domain;

import com.ladder.perfumism.article.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment> findAllByParentIdIsNullAndArticle(Article article, Pageable pageable);

    @Modifying
    @Query(nativeQuery = true, value = "update comment c "
        + "set c.deleted_at = current_timestamp "
        + "where c.comment_id = (:comment_id)")
    Integer updateDeletedAtByArticle(@Param("comment_id") Long commentId);
}
