package com.ladder.perfumism.article.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.controller.dto.response.ArticleReadListResponse;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleImageRepository;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.article.domain.ArticleSubject;
import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.comment.domain.Comment;
import com.ladder.perfumism.comment.domain.CommentRepository;
import com.ladder.perfumism.image.ImageUploader;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.vote.domain.Vote;
import com.ladder.perfumism.vote.domain.VoteItem;
import com.ladder.perfumism.vote.domain.VoteItemRepository;
import com.ladder.perfumism.vote.domain.VoteMember;
import com.ladder.perfumism.vote.domain.VoteMemberRepository;
import com.ladder.perfumism.vote.domain.VoteRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
public class ArticleServiceTest {

    @InjectMocks
    private ArticleService articleService;

    @Mock
    private MemberService memberService;

    @Mock
    private ImageUploader imageUploader;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private ArticleImageRepository articleImageRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private VoteRepository voteRepository;

    @Mock
    private VoteItemRepository voteItemRepository;

    @Mock
    private VoteMemberRepository voteMemberRepository;

    private static final int FIRST_PAGE = 0;
    private static final int DEFAULT_SIZE = 10;

    private Member member;
    private Article article;

    @BeforeEach
    void Setup(){
        member = new Member("test@test.com", "test", "test", Authority.ROLE_MEMBER, "");
        article = new Article(1L,member,ArticleSubject.RECOMMEND,"제목입니다","내용입니다",false);
    }

    @Test
    @DisplayName("게시글 저장")
    void createArticleTest(){
        // given
        String email = "test@test.com";
        given(memberService.findByEmail(any())).willReturn(member);
        ArticleCreateRequest request = new ArticleCreateRequest(ArticleSubject.RECOMMEND,"제목입니다","내용입니다");
        given(articleRepository.save(any())).willReturn(article);

        // when
        Article result = articleService.createArticle(email,request);

        // then
        assertThat(result).isNotNull();
    }


    @Test
    @DisplayName("게시글 조회")
    void showArticleListTest(){
        // give
        ArticleSubject subject = ArticleSubject.RECOMMEND;
        Pageable pageable = PageRequest.of(FIRST_PAGE, DEFAULT_SIZE, Sort.by("id").descending());

        List<Article> articles = new ArrayList<>();
        articles.add(article);
        Page<Article> articlePage = new PageImpl<>(articles);
        given(articleRepository.findBySubject(subject,pageable)).willReturn(articlePage);
        given(articleRepository.findAll(pageable)).willReturn(articlePage);

        // when
        ArticleReadListResponse result1 = articleService.showArticleList(pageable,subject);
        ArticleReadListResponse result2 = articleService.showArticleList(pageable,null);

        // then
        assertThat(result1.getArticleList().get(0).getArticleId()).isEqualTo(article.getId());
        assertThat(result1.getArticleList().get(0).getTitle()).isEqualTo(article.getTitle());
        assertThat(result1.getArticleList().get(0).getContent()).isEqualTo(article.getContent());

        assertThat(result2.getArticleList().get(0).getArticleId()).isEqualTo(article.getId());
        assertThat(result2.getArticleList().get(0).getTitle()).isEqualTo(article.getTitle());
        assertThat(result2.getArticleList().get(0).getContent()).isEqualTo(article.getContent());
    }

    @Test
    @DisplayName("게시글 수정")
    void updateArticleTest(){
        // given
        String email = "test@test.com";

        given(articleRepository.findById(1L)).willReturn(Optional.ofNullable(article));
        ArticleCreateRequest request = new ArticleCreateRequest(ArticleSubject.RECOMMEND,"제목변경입니다","내용변경입니다");

        // when
        articleService.updateArticle(email,article.getId(),request);

        // then
        assertThat(article.getTitle()).isEqualTo(request.getTitle());
        assertThat(article.getContent()).isEqualTo(request.getContent());
    }
// 임시 주석
//    @Test
//    @DisplayName("게시글 삭제")
//    void removeArticleTest(){
//        // given
//        String email = "test@test.com";
//        given(articleRepository.findById(1L)).willReturn(Optional.ofNullable(article));
//        given(commentRepository.existsByArticle(any())).willReturn(false);
//
//        // when
//        articleService.removeArticle(email,article.getId());
//
//        // then
//        assertThat(article.getDeletedAt()).isNotNull();
//    }
}
