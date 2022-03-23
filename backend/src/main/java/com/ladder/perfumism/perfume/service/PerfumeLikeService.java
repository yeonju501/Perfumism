package com.ladder.perfumism.perfume.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.service.MemberService;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeLikeResponse;
import com.ladder.perfumism.perfume.controller.dto.response.PerfumeListResponse;
import com.ladder.perfumism.perfume.domain.Perfume;
import com.ladder.perfumism.perfume.domain.PerfumeLike;
import com.ladder.perfumism.perfume.domain.PerfumeLikeRepository;
import com.ladder.perfumism.perfume.domain.PerfumeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PerfumeLikeService {

    private final MemberService memberService;
    private final PerfumeRepository perfumeRepository;
    private final PerfumeLikeRepository perfumeLikeRepository;

    public PerfumeLikeService(MemberService memberService, PerfumeRepository perfumeRepository,
        PerfumeLikeRepository perfumeLikeRepository) {
        this.memberService = memberService;
        this.perfumeRepository = perfumeRepository;
        this.perfumeLikeRepository = perfumeLikeRepository;
    }

    @Transactional
    public Long likePerfume(String email, Long perfumeId) {
        Member member = memberService.findByEmail(email);
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
        Member member = memberService.findByEmail(email);
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        Boolean liked = perfumeLikeRepository.existsByMemberIdAndPerfumeId(member, perfume);

        return PerfumeLikeResponse.from(liked);
    }

    @Transactional
    public void notLikeThisPerfumeAnymore(String email, Long perfumeId) {
        Member member = memberService.findByEmail(email);
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_FOUND_BY_ID));

        PerfumeLike perfumeLike = perfumeLikeRepository.findByPerfumeIdAndMemberId(perfume, member)
            .orElseThrow(() -> new BusinessException(ErrorCode.PERFUME_NOT_LIKE_THIS_BEFORE));

        perfumeLike.saveDeletedTime();

        perfume.saveLike(perfumeLikeRepository.countByPerfumeId(perfume));
    }

    @Transactional(readOnly = true)
    public PerfumeListResponse myFavoritePerfumeList(String email, Pageable pageable) {
        Member member = memberService.findByEmail(email);

        Page<PerfumeLike> perfumeLikeList = perfumeLikeRepository.findByMemberId(member, pageable);

        return PerfumeListResponse.fromLikes(perfumeLikeList);
    }
}
