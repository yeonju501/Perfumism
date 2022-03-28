package com.ladder.perfumism.vote.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.member.domain.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class VoteMember extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_member_id")
    private Long id;

    @ManyToOne(targetEntity = Vote.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote voteId;

    @ManyToOne(targetEntity = VoteItem.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_item_id")
    private VoteItem voteItemId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;


}
