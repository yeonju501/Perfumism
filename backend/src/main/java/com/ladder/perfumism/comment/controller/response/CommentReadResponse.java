package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.comment.domain.Comment;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class CommentReadResponse {

    @JsonProperty("comment_id")
    @ApiModelProperty(position = 0, notes = "댓글 ID", example = "1")
    private Long commentId;

    @JsonProperty("member_id")
    @ApiModelProperty(position = 1, notes = "멤버 ID", example = "1")
    private Long memberId;

    @JsonProperty("member_name")
    @ApiModelProperty(position = 2, notes = "멤버 이름", example = "우사앙주운")
    private String memberName;

    @JsonProperty("article_id")
    @ApiModelProperty(position = 3, notes = "게시글 ID", example = "1")
    private Long articleId;

    @JsonProperty("content")
    @ApiModelProperty(required = true, position = 4, notes = "내용", example = "나는 쓴다 댓글 여기에")
    private String content;

    @JsonProperty("createAt")
    @ApiModelProperty(position = 5, notes = "생성 시간", example = "2022,3,13,14,59,51,0000000")
    private LocalDateTime createAt;

    @JsonProperty("updateAt")
    @ApiModelProperty(position = 6, notes = "수정 시간", example = "2023,4,14,14,59,51,0000000")
    private LocalDateTime updateAt;

    @JsonProperty("deletion")
    @ApiModelProperty(position = 7, notes = "삭제 유무", example = "false(삭제X) or ture(삭제O)")
    private Boolean deletion;

    @JsonProperty("replyList")
    @ApiModelProperty(position = 8, notes = "대댓글 리스트 없을 때 = []")
    private List<CommentReplyReadResponse> replyList;


    public CommentReadResponse(){

    }

    public CommentReadResponse(
        Long commentId, Long memberId, String memberName,
        Long articleId, String content, LocalDateTime createAt, LocalDateTime updateAt,
        List<CommentReplyReadResponse> replyList, Boolean deletion){
        this.commentId = commentId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.articleId = articleId;
        this.content = content;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.replyList = replyList;
        this.deletion = deletion;
    }

    public static CommentReadResponse from(Comment comment){
        return new CommentReadResponse(
            comment.getId(),
            comment.getMember().getId(),
            comment.getMember().getUsername(),
            comment.getArticle().getId(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt(),
            comment.getReplyList().stream().map(CommentReplyReadResponse::from)
                .filter(c -> !c.getDeletion()).collect(Collectors.toList()),
            comment.getDeletion()
        );
    }

}
