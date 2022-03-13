package com.ladder.perfumism.article.service;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadDetailResponse;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadListResponse;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;


    public ArticleService(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    @Transactional
    public void articleCreate(ArticleCreateRequest request) {
        Article article = Article.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .subject(request.getSubject())
            .build();

        articleRepository.save(article);
    }

    @Transactional
    public ArticleReadListResponse showArticleList(Pageable pageable) {
        Page<Article> articleList = articleRepository.findAll(pageable);

        return ArticleReadListResponse.from(articleList);
    }

    @Transactional
    public ArticleReadDetailResponse showArticleDetail(Long article_Id) {
        Article article = articleRepository.findById(article_Id)
            .orElseThrow(()-> new BusinessException(ErrorCode.ARTICLE_NOT_FOUNT_MY_ARTICLE_ID));
        return ArticleReadDetailResponse.from(article);
    }

    @Transactional
    public void updateArticle(Long articleId, ArticleCreateRequest request) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUNT_MY_ARTICLE_ID));

        article.changeSubject(request.getSubject());
        article.changeTitle(request.getTitle());
        article.changeContent(request.getContent());

    }

    public void deleteArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(()-> new BusinessException(ErrorCode.ARTICLE_NOT_FOUNT_MY_ARTICLE_ID));

        articleRepository.delete(article);
    }
}
