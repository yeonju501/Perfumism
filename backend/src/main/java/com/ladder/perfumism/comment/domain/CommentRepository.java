package com.ladder.perfumism.comment.domain;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.member.domain.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment> findAllByParentIdIsNullAndArticle(Article article, Pageable pageable);

    Boolean existsByArticle(Article article);

    @Modifying
    @Query(nativeQuery = true, value = "update comment c "
        + "set c.deleted_at = current_timestamp "
        + "where c.article_id = (:article_id)")
    Integer updateDeletedAtByArticle(@Param("article_id") Long article_id);

    Page<Comment> findByMember(Member member, Pageable pageable);

    @Modifying
    @Query(value = "update Comment c "
        + "set c.deletedAt = current_timestamp "
        + "where c.member = :member")
    Integer updateDeletedAtByMemberId(@Param("member") Member member);
}
