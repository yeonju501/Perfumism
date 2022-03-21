package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeDetailResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeLikeResponse;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeAccord;
import com.ladder.perfumism.perfume.domain.PerfumeAccordRepository;
import com.ladder.perfumism.perfume.domain.PerfumeLike;
import com.ladder.perfumism.perfume.domain.PerfumeLikeRepository;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import com.ladder.perfumism.perfume.domain.SimilarPerfume;
import com.ladder.perfumism.perfume.domain.SimilarPerfumeRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeAccordRepository perfumeAccordRepository;
    private final SimilarPerfumeRepository similarPerfumeRepository;
    private final PerfumeLikeRepository perfumeLikeRepository;
    private final MemberRepository memberRepository;

    public PerfumeService(PerfumeRepository perfumeRepository,
        PerfumeAccordRepository perfumeAccordRepository,
        SimilarPerfumeRepository similarPerfumeRepository,
        PerfumeLikeRepository perfumeLikeRepository, MemberRepository memberRepository) {
        this.perfumeRepository = perfumeRepository;
        this.perfumeAccordRepository = perfumeAccordRepository;
        this.similarPerfumeRepository = similarPerfumeRepository;
        this.perfumeLikeRepository = perfumeLikeRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional(readOnly = true)
    public PerfumeDetailResponse viewDetailPerfume(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        List<PerfumeAccord> perfumeAccords = perfumeAccordRepository.findByPerfumeId(perfume);

        List<SimilarPerfume> similarPerfumes = similarPerfumeRepository.findByOriginId(perfume);

        return PerfumeDetailResponse.from(perfume, perfumeAccords, similarPerfumes);
    }

    @Transactional
    public Long likePerfume(String email, Long perfumeId) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        alreadyLikeThisPerfume(member, perfume);

        PerfumeLike perfumeLike = perfumeLikeRepository.save(PerfumeLike.createPerfumeLike(perfume, member));

        perfume.saveLike(perfumeLikeRepository.countByPerfumeId(perfume));

        return (perfumeLike.getId());
    }

    private void alreadyLikeThisPerfume(Member member, Perfume perfume) {
        if (perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume)) {
            throw new BusinessException(ErrorCode.PERFUME_ALREADY_LIKE);
        }
    }

    @Transactional(readOnly = true)
    public PerfumeLikeResponse isLikeThisPerfume(String email, Long perfumeId) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        Boolean liked = perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume);

        return PerfumeLikeResponse.from(liked);
    }

    @Transactional
    public void notLikeThisPerfumeAnymore(String email, Long perfumeId) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        PerfumeLike perfumeLike = perfumeLikeRepository.findByPerfumeIdAndMemberId(perfume, member)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_LIKE_THIS_BEFORE));

        perfumeLike.saveDeletedTime();

        perfume.saveLike(perfumeLikeRepository.countByPerfumeId(perfume));
    }
}
