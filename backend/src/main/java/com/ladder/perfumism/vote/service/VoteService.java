package com.ladder.perfumism.vote.service;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.article.service.ArticleService;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.vote.controller.dto.request.VoteChooseRequest;
import com.ladder.perfumism.vote.controller.dto.request.VoteCreateRequest;
import com.ladder.perfumism.vote.controller.dto.response.VoteReadListResponse;
import com.ladder.perfumism.vote.domain.Vote;
import com.ladder.perfumism.vote.domain.VoteItem;
import com.ladder.perfumism.vote.domain.VoteItemRepository;
import com.ladder.perfumism.vote.domain.VoteMember;
import com.ladder.perfumism.vote.domain.VoteMemberRepository;
import com.ladder.perfumism.vote.domain.VoteRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VoteService {

    private final ArticleService articleService;
    private final MemberService memberService;
    private final VoteRepository voteRepository;
    private final VoteItemRepository voteItemRepository;
    private final VoteMemberRepository voteMemberRepository;

    public VoteService(ArticleService articleService, MemberService memberService,
        VoteRepository voteRepository, VoteItemRepository voteItemRepository,
        VoteMemberRepository voteMemberRepository){
        this.articleService = articleService;
        this.memberService = memberService;
        this.voteRepository = voteRepository;
        this.voteItemRepository = voteItemRepository;
        this.voteMemberRepository = voteMemberRepository;
    }

    private void notYourVote(String email, Article article){
        if(!article.getMember().getEmail().equals(email))
        {
            throw new BusinessException(ErrorCode.VOTE_IS_NOT_YOURS);
        }
    }

    private Vote findByArticle(Article article){
        return voteRepository.findByArticle(article)
            .orElseThrow(()->new BusinessException(ErrorCode.VOTE_NOT_FOUND));
    }

    private VoteItem findById(Long voteItem){
        return voteItemRepository.findById(voteItem)
            .orElseThrow(()->new BusinessException(ErrorCode.VOTE_ITEM_IS_NOT_FOUND));
    }

    @Transactional
    public void createVote(String email, Long articleId, VoteCreateRequest request) {

        Article article = articleService.findById(articleId);
        articleService.notYourArticle(email, article);

        Vote vote = Vote.builder()
            .article(article)
            .title(request.getTitle())
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
        article.changeVoteExist();
    }

    @Transactional
    public VoteReadListResponse showVoteList(Long articleId) {

        Article article = articleService.findById(articleId);

        Vote vote = findByArticle(article);

        List<VoteItem> voteItem = voteItemRepository.findByVote(vote);

        vote.saveVoterCnt(voteMemberRepository.countByVote(vote));

        return VoteReadListResponse.from(vote, voteItem);
    }

    @Transactional
    public void expireVote(String email, Long articleId) {

        Article article = articleService.findById(articleId);
        articleService.notYourArticle(email, article);

        Vote vote = findByArticle(article);
        notYourVote(email,article);


        vote.changVoteExpiration();

    }

    @Transactional
    public void chooseVote(String email, Long articleId, VoteChooseRequest request) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);

        Vote vote = findByArticle(article);
        VoteItem choseVoteItem = findById(request.getVoteItem());

        List<VoteItem> voteItems = voteItemRepository.findByVote(vote);

        for (VoteItem voteItem: voteItems){
            Optional<VoteMember> presentVoteMember = voteMemberRepository.findByMemberAndVoteItem(member,voteItem);
            if (presentVoteMember.isPresent())
            {
                VoteMember pastVoteMember = voteMemberRepository.getById(presentVoteMember.get().getId());

                voteMemberRepository.delete(pastVoteMember);

                break;
            }

        }

        VoteMember futureVoteMember = VoteMember.builder()
            .vote(vote)
            .voteItem(choseVoteItem)
            .member(member)
            .build();

        voteMemberRepository.save(futureVoteMember);
        choseVoteItem.saveMemberCnt(voteMemberRepository.countByVoteItem(choseVoteItem));

    }
}
