package com.ladder.perfumism.article.service;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadDetailResponse;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadListResponse;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.article.domain.ArticleSubject;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;


    public ArticleService(ArticleRepository articleRepository, MemberRepository memberRepository){
        this.articleRepository = articleRepository;
        this.memberRepository = memberRepository;
    }

    private void checkArticleOwner(String email, Article article){
        if(!article.getMember().getEmail().equals(email)){
            throw new BusinessException(ErrorCode.ARTICLE_IS_NOT_YOURS);
        }
    }

    @Transactional
    public void articleCreate(String email, ArticleCreateRequest request) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(()-> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));

        Article article = Article.builder()
            .member(member)
            .title(request.getTitle())
            .content(request.getContent())
            .subject(request.getSubject())
            .build();

        articleRepository.save(article);
    }

    @Transactional
    public ArticleReadListResponse showArticleList(String email,Pageable pageable, ArticleSubject subject) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(()->new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));

        Page<Article> articleList;
        if (subject != null){
            articleList = articleRepository.findBySubject(subject,pageable);

        } else{
            articleList = articleRepository.findAll(pageable);
        }

        return ArticleReadListResponse.from(articleList);
    }

    @Transactional
    public ArticleReadDetailResponse showArticleDetail(String email, Long article_Id) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(()->new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        Article article = articleRepository.findById(article_Id)
            .orElseThrow(()-> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));
        return ArticleReadDetailResponse.from(article);
    }

    @Transactional
    public void updateArticle(String email, Long articleId, ArticleCreateRequest request) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(()->new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));

        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));

        checkArticleOwner(email, article);

        article.changeSubject(request.getSubject());
        article.changeTitle(request.getTitle());
        article.changeContent(request.getContent());

    }

    @Transactional
    public void deleteArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(()-> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND));

        articleRepository.delete(article);
    }
}
