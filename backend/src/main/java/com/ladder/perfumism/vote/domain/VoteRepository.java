package com.ladder.perfumism.vote.domain;

import com.ladder.perfumism.article.domain.Article;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote,Long> {

    Optional<Vote> findByArticle(Article article);
}
