package com.ladder.perfumism.vote.domain;

import com.ladder.perfumism.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteMemberRepository extends JpaRepository<VoteMember,Long> {

    Optional<VoteMember> findByMemberAndVoteItem(Member member,VoteItem voteItem);

    Integer countByVoteItem(VoteItem voteItem);

    Integer countByVote(Vote vote);

    @Modifying
    @Query(nativeQuery = true, value = "update vote_member vm "
        + "set vm.deleted_at = current_timestamp "
        + "where vm.article_id = (:article_id)")
    Integer updateDeletedAtByArticle(@Param("article_id") Long article_id);
}
