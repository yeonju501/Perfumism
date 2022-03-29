package com.ladder.perfumism.vote.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class VoteItem extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_item_id")
    private Long id;

    @ManyToOne(targetEntity = Vote.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "vote_member_count")
    private int vote_member_count;

    public VoteItem(){

    }

    @Builder
    public VoteItem(Vote vote, String content){
        this.vote = vote;
        this.content = content;
        this.vote_member_count = 0;
    }

    public void saveMemberCnt(Integer vote_member_count){
        this.vote_member_count = vote_member_count;
    }
}
