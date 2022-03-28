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
public class VoteItem{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_item_id")
    private Long id;

    @ManyToOne(targetEntity = Vote.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @Column(name = "content", nullable = false)
    private String content;

    public VoteItem(){

    }

    @Builder
    public VoteItem(Vote vote, String content){
        this.vote = vote;
        this.content = content;
    }
}
