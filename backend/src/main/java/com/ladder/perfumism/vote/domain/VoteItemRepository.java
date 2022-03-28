package com.ladder.perfumism.vote.domain;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteItemRepository extends JpaRepository<VoteItem,Long> {

    List<VoteItem> findByVote(Vote vote);
}
