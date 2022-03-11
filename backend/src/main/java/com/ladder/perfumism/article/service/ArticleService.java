package com.ladder.perfumism.article.service;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadListResponse;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleRepository;
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
}
