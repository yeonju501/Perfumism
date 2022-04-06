package com.ladder.perfumism.article.domain;

import com.ladder.perfumism.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends JpaRepository<Article,Long> {

    Page<Article> findBySubject(ArticleSubject subjects, Pageable pageable);

    Page<Article> findByMember(Member member, Pageable pageable);

    @Modifying
    @Query(value = "update Article a "
        + "set a.deletedAt = current_timestamp "
        + "where a.member = :member")
    Integer updateDeletedAtByMemberId(@Param("member") Member member);
}
