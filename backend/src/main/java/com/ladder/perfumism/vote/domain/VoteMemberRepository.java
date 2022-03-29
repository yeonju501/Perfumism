package com.ladder.perfumism.vote.domain;

import com.ladder.perfumism.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteMemberRepository extends JpaRepository<VoteMember,Long> {

    Optional<VoteMember> findByMemberAndVoteItem(Member member,VoteItem voteItem);

    Integer countByVoteItem(VoteItem voteItem);

    Integer countByVote(Vote vote);

}
