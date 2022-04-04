package com.ladder.perfumism.global.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // global
    GLOBAL_ILLEGAL_ERROR(HttpStatus.BAD_REQUEST, "ILLEGAL 에러입니다.", "Z01"),
    GLOBAL_INTERNAL_SERVER_ERROR(HttpStatus.BAD_REQUEST, "RUNTIME 에러입니다.", "Z02"),

    // authentication
    INVALID_EXPIRED_JWT(HttpStatus.FORBIDDEN, "만료된 토큰입니다.", "A01"),
    INVALID_MALFORMED_JWT(HttpStatus.UNAUTHORIZED, "잘못된 토큰 서명입니다.", "A02"),
    INVALID_UNSUPPORTED_JWT(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다.", "A03"),
    INVALID_ILLEGAL_ARGUMENT_JWT(HttpStatus.UNAUTHORIZED, "토큰이 잘못되었습니다.", "A04"),
    INVALID_LOGOUT_USER_JWT(HttpStatus.UNAUTHORIZED, "로그아웃된 유저입니다", "A05"),
    INVALID_NOT_FOUND_AUTHORITY(HttpStatus.NOT_FOUND, "토큰에 권한값이 존재하지 않습니다.", "A06"),

    //refresh token
    INVALID_NOT_MATCH_BY_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "리프레시 토큰이 일치하지 않습니다", "A07"),
    INVALID_EXPIRED_REFRESH_TOKEN(HttpStatus.FORBIDDEN, "만료된 리프레시 토큰입니다.", "A08"),
    INVALID_MALFORMED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 리프레시 토큰 서명입니다.", "A09"),
    INVALID_UNSUPPORTED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "지원하지 않는 리프레시 토큰입니다.", "A10"),
    INVALID_ILLEGAL_ARGUMENT_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "리프레쉬 토큰이 잘못되었습니다.", "A11"),

    // authority
    AUTHORITY_NOT_FOUND_BY_AUTHORITY_CODE(HttpStatus.NOT_FOUND, "존재하지 않는 권한코드입니다.", "B01"),
    AUTHORITY_ACCESS_DENIED(HttpStatus.UNAUTHORIZED, "접근 권한이 없는 권한코드입니다.", "B02"),
    AUTHORITY_ENTRY_POINT(HttpStatus.UNAUTHORIZED, "오류가 있는 권한코드입니다.", "B03"),

    // member
    MEMBER_NOT_FOUND_BY_EMAIL(HttpStatus.NOT_FOUND, "존재하지 않는 유저의 이메일입니다.", "C01"),
    MEMBER_LOGIN_ERROR_BY_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않는 유저입니다", "C03"),
    MEMBER_EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 존재하는 이메일 입니다.", "C04"),
    MEMBER_USERNAME_DUPLICATED(HttpStatus.CONFLICT, "이미 존재하는 닉네임 입니다.", "C11"),

    // notification
    NOTIFICATION_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 알림입니다.", "D01"),
    NOTIFICATION_NOT_MATCH_BY_EMAIL(HttpStatus.BAD_REQUEST, "알림 수신자와 일치하지 않는 이메일입니다.", "D02"),

    // password code
    PASSWORD_CODE_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 인증번호입니다.", "E01"),

    // article
    ARTICLE_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 게시글입니다", "H01"),
    ARTICLE_IS_NOT_YOURS(HttpStatus.BAD_REQUEST,"당신의 게시글이 아닙니다","H02"),

    // comment
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다","I01"),
    COMMENT_IS_NOT_YOURS(HttpStatus.BAD_REQUEST, "당신의 댓글이 아닙니다","I02"),

    // vote
    VOTE_NOT_FOUND(HttpStatus.NOT_FOUND,"진행되는 투표가 없습니다", "J01"),
    VOTE_IS_NOT_YOURS(HttpStatus.BAD_REQUEST, "당신의 투표가 아닙니다", "J02"),
    VOTE_ITEM_IS_NOT_FOUND(HttpStatus.NOT_FOUND, "투표 항목이 없습니다","J03"),
    VOTE_IS_EXPIRE(HttpStatus.BAD_REQUEST,"만료된 투표 입니다","J04"),

    // perfume
    PERFUME_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 퍼퓸 ID 입니다", "S01"),
    PERFUME_ALREADY_LIKE(HttpStatus.CONFLICT, "이미 향수에 좋아요를 하셨습니다.", "S02"),
    PERFUME_NOT_LIKE_THIS_BEFORE(HttpStatus.NOT_FOUND, "이 향수를 좋아한 적이 없습니다.", "S03"),

    // search
    SEARCH_TOO_SHORT_KEYWORD(HttpStatus.BAD_REQUEST, "검색어는 2글자 이상 입력하셔야 합니다.", "T01"),
    SEARCH_NOT_EXIST_TYPE(HttpStatus.NOT_FOUND, "존재하지 않는 검색 타입입니다.", "T02"),

    // brand
    BRAND_NOT_FOUND_BY_NAME(HttpStatus.NOT_FOUND, "존재하지 않는 브랜드 이름 입니다", "U01"),

    //review
    REVIEW_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 리뷰 ID 입니다", "V01"),
    REVIEW_OVER_GRADE(HttpStatus.CONFLICT, "평점은 5점을 넘어설 수 없습니다.", "V02"),
    REVIEW_UNDER_GRADE(HttpStatus.CONFLICT, "평점은 0점보다 낮을 수 없습니다.", "V03"),
    REVIEW_NOT_YOUR_REVIEW(HttpStatus.BAD_REQUEST, "본인의 리뷰가 아닙니다. 당신 누구야", "V04"),
    REVIEW_ALREADY_WRITTEN(HttpStatus.CONFLICT, "이미 이 향수에 리뷰를 작성하셨습니다.", "V05"),
    REVIEW_NOT_WRITTEN_THIS_PERFUME(HttpStatus.NOT_FOUND, "이 향수에 리뷰를 쓰지 않았습니다.", "V06"),
    REVIEW_ALREADY_LIKE(HttpStatus.CONFLICT, "이미 리뷰에 좋아요를 하셨습니다.", "V07"),
    REVIEW_NO_LIKE_YOURSELF(HttpStatus.CONFLICT, "본인의 리뷰에 좋아요를 할 수 없습니다. 자추추", "V08"),
    REVIEW_NOT_LIKE_THIS_BEFORE(HttpStatus.NOT_FOUND, "이 리뷰를 좋아한 적이 없습니다.", "V09"),

    //accord
    ACCORD_NOT_FOUND_BY_NAME(HttpStatus.NOT_FOUND, "존재하지 않는 향 특징 이름 입니다", "W01"),
    ;
    private final HttpStatus httpStatus;
    private final String message;
    private final String code;

    ErrorCode(HttpStatus httpStatus, String message, String code) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.code = code;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }

    public String getCode() {
        return code;
    }
}
