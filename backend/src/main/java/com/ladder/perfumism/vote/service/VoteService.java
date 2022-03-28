package com.ladder.perfumism.vote.service;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.vote.controller.dto.request.VoteCreateRequest;
import com.ladder.perfumism.vote.domain.Vote;
import com.ladder.perfumism.vote.domain.VoteItem;
import com.ladder.perfumism.vote.domain.VoteItemRepository;
import com.ladder.perfumism.vote.domain.VoteRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;

    public VoteService(ArticleRepository articleRepository, MemberRepository memberRepository,
        VoteRepository voteRepository, VoteItemRepository voteItemRepository){
        this.articleRepository = articleRepository;
        this.memberRepository = memberRepository;
        this.voteRepository = voteRepository;
        this.voteItemRepository = voteItemRepository;
    }

    public void createVote(String email, Long articleId, VoteCreateRequest request) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(()->new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));

        Vote vote = Vote.builder()
            .articleId(article)
            .title(request.getTitle())
            .build();

        voteRepository.save(vote);

        List<String> items = request.getVoteItemList();
        for (String item : items ){
            VoteItem voteItem = VoteItem.builder()
                .voteId(vote)
                .content(item)
                .build();

            voteItemRepository.save(voteItem);
        }
    }
}
