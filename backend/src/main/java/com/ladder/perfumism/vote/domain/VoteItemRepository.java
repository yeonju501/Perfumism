package com.ladder.perfumism.vote.domain;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteItemRepository extends JpaRepository<VoteItem,Long> {

    List<VoteItem> findByVote(Vote vote);

    @Modifying
    @Query(nativeQuery = true, value = "update vote_item vi "
        + "set vi.deleted_at = current_timestamp "
        + "where vi.vote_id = (:vote_id)")
    Integer updateDeletedAtByVote(@Param("vote_id") Long vote_id);
}
