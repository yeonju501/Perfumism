package com.ladder.perfumism.comment.service;

import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.comment.controller.request.CommentCreateRequest;
import com.ladder.perfumism.comment.controller.response.CommentReadListResponse;
import com.ladder.perfumism.comment.domain.Comment;
import com.ladder.perfumism.comment.domain.CommentRepository;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.notification.service.NotificationService;
import java.util.Objects;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    private final MemberService memberService;
    private final ArticleRepository articleRepository;
    private final CommentRepository commentRepository;
    private final NotificationService notificationService;

    public CommentService(MemberService memberService, ArticleRepository articleRepository,
        CommentRepository commentRepository, NotificationService notificationService) {
        this.memberService = memberService;
        this.articleRepository = articleRepository;
        this.commentRepository = commentRepository;
        this.notificationService = notificationService;
    }

    private Article ARTICLE_NOT_FOUND_FUNC(Long articleId){
        return articleRepository.findById(articleId)
            .orElseThrow(()-> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));
    }

    private Comment COMMENT_NOT_FOUND_FUNC(Long commentId){
        return commentRepository.findById(commentId)
            .orElseThrow(()->new BusinessException(ErrorCode.COMMENT_NOT_FOUND));
    }

    private void COMMENT_IS_NOT_YOURS_FUNC(String email, Comment comment){
        if(!comment.getMember().getEmail().equals(email)){
            throw new BusinessException(ErrorCode.COMMENT_IS_NOT_YOURS);
        }
    }

    @Transactional
    public void createComment(String email, Long articleId,
        CommentCreateRequest request) {

        Member member = memberService.findByEmail(email);
        Article article = ARTICLE_NOT_FOUND_FUNC(articleId);

        Comment comment = Comment.builder()
            .member(member)
            .article(article).
            content(request.getContent())
            .build();

        commentRepository.save(comment);
        notificationService.createCommentNotification(comment);
    }

    @Transactional
    public CommentReadListResponse showCommentList(String email, Pageable pageable, Long articleId) {

        Member member = memberService.findByEmail(email);
        Article article = ARTICLE_NOT_FOUND_FUNC(articleId);

        Page<Comment> commentList = commentRepository.findAllByParentIdIsNullAndArticle(article, pageable);

        return CommentReadListResponse.from(commentList);
    }

    @Transactional
    public void updateComment(String email, Long articleId, Long commentId,
        CommentCreateRequest request) {

        Member member = memberService.findByEmail(email);
        Article article = ARTICLE_NOT_FOUND_FUNC(articleId);
        Comment comment = COMMENT_NOT_FOUND_FUNC(commentId);
        COMMENT_IS_NOT_YOURS_FUNC(email,comment);

        comment.changeContent(request.getContent());

    }

    @Transactional
    public void removeComment(String email, Long articleId, Long commentId) {

        Member member = memberService.findByEmail(email);
        Article article = ARTICLE_NOT_FOUND_FUNC(articleId);
        Comment comment = COMMENT_NOT_FOUND_FUNC(commentId);
        COMMENT_IS_NOT_YOURS_FUNC(email,comment);

        if(comment.getParentId() == null){
            comment.isDeletion();
            if(comment.getReplyList().isEmpty()){
                comment.saveDeletedTime();
            }
        } else {

            comment.saveDeletedTime();

            if(comment.getParentId().getDeletion() &&
                !comment.getParentId().getReplyList().stream().anyMatch(c-> Objects.isNull(c.getDeletedAt()))){

                comment.getParentId().saveDeletedTime();
            }
        }


//        commentRepository.delete(comment);
    }

    @Transactional
    public void createCommentReply(String email, Long articleId, Long commentId,
        CommentCreateRequest request) {

        Member member = memberService.findByEmail(email);
        Article article = ARTICLE_NOT_FOUND_FUNC(articleId);
        Comment parentId = COMMENT_NOT_FOUND_FUNC(commentId);

        Comment reply = Comment.builder()
            .member(member)
            .article(article)
            .parentId(parentId)
            .content(request.getContent())
            .build();

        commentRepository.save(reply);
        notificationService.createReplyNotification(reply);
    }
}
