package com.ladder.perfumism.vote.service;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.vote.controller.dto.request.VoteCreateRequest;
import com.ladder.perfumism.vote.controller.dto.response.VoteReadListResponse;
import com.ladder.perfumism.vote.domain.Vote;
import com.ladder.perfumism.vote.domain.VoteItem;
import com.ladder.perfumism.vote.domain.VoteItemRepository;
import com.ladder.perfumism.vote.domain.VoteRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private void VOTE_IS_NOT_YOURS_FUNC(String email, Article article){
        if(!article.getMember().getEmail().equals(email))
        {
            throw new BusinessException(ErrorCode.VOTE_IS_NOT_YOURS);
        }
    }

    @Transactional
    public void createVote(String email, Long articleId, VoteCreateRequest request) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(()->new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));

        Vote vote = Vote.builder()
            .article(article)
            .title(request.getTitle())
            .totalVoter(0)
            .build();

        voteRepository.save(vote);

        List<String> items = request.getVoteItemList();
        for (String item : items ){
            VoteItem voteItem = VoteItem.builder()
                .vote(vote)
                .content(item)
                .build();

            voteItemRepository.save(voteItem);
        }
    }

    @Transactional
    public VoteReadListResponse showVoteList(String email, Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(()->new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));

        Vote vote = voteRepository.findByArticle(article)
            .orElseThrow(()->new BusinessException(ErrorCode.VOTE_NOT_FOUND));

        List<VoteItem> voteItem = voteItemRepository.findByVote(vote);

        return VoteReadListResponse.from(vote, voteItem);
    }

    @Transactional
    public void expireVote(String email, Long articleId) {

        Article article = articleRepository.findById(articleId)
            .orElseThrow(()->new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));

        VOTE_IS_NOT_YOURS_FUNC(email,article);

        Vote vote = voteRepository.findByArticle(article)
            .orElseThrow(()->new BusinessException(ErrorCode.VOTE_NOT_FOUND));

        vote.changVoteExpiration();

    }
}
