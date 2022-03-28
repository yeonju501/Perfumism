package com.ladder.perfumism.global.schedule;

import com.ladder.perfumism.perfume.service.PerfumeService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PerfumeScheduleTasks {

    private final PerfumeService perfumeService;

    public PerfumeScheduleTasks(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @Scheduled(cron = "0 1 0 1 * *")
    // 초 분 시 일 월 요일
    // 즉 매월 1일 0시 1분에 새로고침
    public void refreshingMonthlyPerfume() {
        perfumeService.refreshingMonthlyPerfumeList();
    }
}
