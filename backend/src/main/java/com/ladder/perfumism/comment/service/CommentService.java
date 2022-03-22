package com.ladder.perfumism.comment.service;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.comment.controller.request.CommentCreateRequest;
import com.ladder.perfumism.comment.domain.Comment;
import com.ladder.perfumism.comment.domain.CommentRepository;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;
    private final CommentRepository commentRepository;

    public CommentService(MemberRepository memberRepository, ArticleRepository articleRepository, CommentRepository commentRepository){
        this.memberRepository = memberRepository;
        this.articleRepository = articleRepository;
        this.commentRepository = commentRepository;
    }

    public void commentCreate(String email, Long articleId, CommentCreateRequest request) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(()-> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));

        Article article = articleRepository.findById(articleId)
            .orElseThrow(()-> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));

        Comment comment = Comment.builder()
            .member(member)
            .article(article).
            content(request.getContent())
            .build();

        commentRepository.save(comment);
    }
}
