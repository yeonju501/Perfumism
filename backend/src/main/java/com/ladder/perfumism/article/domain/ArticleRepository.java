package com.ladder.perfumism.article.domain;

import com.ladder.perfumism.member.domain.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article,Long> {

    Page<Article> findBySubject(ArticleSubject subjects, Pageable pageable);

    Page<Article> findByMember(Member member, Pageable pageable);
}
