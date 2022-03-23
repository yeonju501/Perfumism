package com.ladder.perfumism.comment.domain;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.member.domain.Member;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    // 대댓글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId")
    private Comment parentId;

    @OneToMany(mappedBy = "parentId")
    private List<Comment> replyList = new ArrayList<>();

    protected Comment(){

    }

    @Builder
    public Comment(Member member, Article article, String content, Comment parentId){
        this.member = member;
        this.article = article;
        this.content = content;
        this.parentId = parentId;
    }

    public void changeContent(String content) {
        if (!Objects.isNull(content)){
            this.content = content;
        }
    }
}
