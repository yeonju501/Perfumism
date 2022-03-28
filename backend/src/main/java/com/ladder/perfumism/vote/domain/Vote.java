package com.ladder.perfumism.vote.domain;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.global.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Vote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    private Long id;

    @OneToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "total_voter")
    private int totalVoter;

    @Column(name = "expiration")
    private Boolean expiration;

    public Vote(){

    }

    @Builder
    private Vote(Article article, String title, int totalVoter){
        this.article = article;
        this.title = title;
        this.totalVoter = totalVoter;
        this.expiration = false;
    }
}
