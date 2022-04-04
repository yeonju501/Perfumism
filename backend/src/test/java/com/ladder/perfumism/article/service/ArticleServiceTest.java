package com.ladder.perfumism.article.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.*;

import com.ladder.perfumism.article.controller.dto.request.ArticleCreateRequest;
import com.ladder.perfumism.article.domain.Article;
import com.ladder.perfumism.article.domain.ArticleImageRepository;
import com.ladder.perfumism.article.domain.ArticleRepository;
import com.ladder.perfumism.article.domain.ArticleSubject;
import com.ladder.perfumism.auth.domain.Authority;
import com.ladder.perfumism.comment.domain.CommentRepository;
import com.ladder.perfumism.image.ImageUploader;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.vote.domain.VoteItemRepository;
import com.ladder.perfumism.vote.domain.VoteMemberRepository;
import com.ladder.perfumism.vote.domain.VoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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

    private Member member;
    private Article article;

    @BeforeEach
    void Setup(){
        member = new Member("test@test.com", "test", "test", Authority.ROLE_MEMBER, "");
        article = new Article(member,ArticleSubject.RECOMMEND,"제목입니다","내용입니다");
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

}
