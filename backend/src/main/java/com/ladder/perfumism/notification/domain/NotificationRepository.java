package com.ladder.perfumism.notification.domain;

import com.ladder.perfumism.member.domain.Member;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByMemberAndCreatedAtBetweenOrderByCreatedAtDesc(Member member, LocalDateTime start, LocalDateTime end);

    List<Notification> findAllByMemberAndCreatedAtBetweenAndReadAtIsNullOrderByCreatedAtDesc(Member member, LocalDateTime start, LocalDateTime end);

    int countAllByMemberAndCreatedAtBetweenAndReadAtIsNull(Member member, LocalDateTime start, LocalDateTime end);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update notification n set n.deleted_at = current_timestamp where n.comment_id in (select comment_id from comment c where c.article_id = (:id)) and n.deleted_at is null")
    int deleteAllByArticle(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update notification n set n.deleted_at = current_timestamp where n.comment_id in (select comment_id from comment c where c.parentId = (:id)) and n.comment_id = (:id) and n.deleted_at is null")
    int deleteAllByComment(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update notification n set n.deleted_at = current_timestamp where n.comment_id = (:id) and n.deleted_at is null")
    int deleteAllByReply(@Param("id") Long id);
}
