package com.ladder.perfumism.article.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.member.domain.Member;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.yaml.snakeyaml.util.EnumUtils;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name = "subject", nullable = false)
    private ArticleSubject subject;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "vote_exist")
    private Boolean voteExist;

    protected Article(){

    }

    public Article(Long id, Member member, ArticleSubject subject, String title, String content){
        this.id = id;
        this.member = member;
        this.subject = subject;
        this.content = content;
    }

    @Builder
    public Article(Member member, ArticleSubject subject, String title, String content){
        this.member = member;
        this.subject = subject;
        this.title = title;
        this.content = content;
        this.voteExist = false;
    }

    public void changeSubject(ArticleSubject subject){
        if(!Objects.isNull(subject)){
            this.subject = subject;
        }
    }

    public void changeTitle(String title){
        if (!Objects.isNull(title)){
            this.title = title;
        }
    }

    public  void changeContent(String content){
        if (!Objects.isNull(content)){
            this.content = content;
        }
    }

    public void changeVoteExist(){
        this.voteExist = true;
    }
}
