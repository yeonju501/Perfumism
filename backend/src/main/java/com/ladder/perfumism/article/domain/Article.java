package com.ladder.perfumism.article.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Article extends BaseEntity {

    @Id @GeneratedValue
//    @Column(name = "article_id")
    private Long id;

    @Enumerated(EnumType.STRING)
//    @Column(name = "subject")
    private ArticleSubject subject;

//    @Column(name = "title")
    private String title;

    @Lob
//    @Column(name = "content")
    private String content;


}
