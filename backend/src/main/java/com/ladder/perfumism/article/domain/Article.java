package com.ladder.perfumism.article.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Article extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "article_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "subject", nullable = false)
    private ArticleSubject subject;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    protected Article(){

    }

    @Builder
    private Article(ArticleSubject subject, String title, String content){
        this.subject = subject;
        this.title = title;
        this.content = content;
    }
}
