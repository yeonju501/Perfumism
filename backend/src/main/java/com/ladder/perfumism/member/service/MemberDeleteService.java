package com.ladder.perfumism.member.service;

import com.ladder.perfumism.article.service.ArticleService;
import com.ladder.perfumism.comment.service.CommentService;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.review.service.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberDeleteService {

    private final MemberService memberService;
    private final ReviewService reviewService;
    private final ArticleService articleService;
    private final CommentService commentService;

    public MemberDeleteService(MemberService memberService, ReviewService reviewService,
        ArticleService articleService, CommentService commentService) {
        this.memberService = memberService;
        this.reviewService = reviewService;
        this.articleService = articleService;
        this.commentService = commentService;
    }

    @Transactional
    public void resignMember(String email) {
        Member member = memberService.findByEmail(email);

        reviewService.updateDeletedAtByMemberId(member);
        articleService.updateDeletedAtByMemberId(member);
        commentService.updateDeletedAtByMemberId(member);
        member.saveDeletedTime();
    }
}
