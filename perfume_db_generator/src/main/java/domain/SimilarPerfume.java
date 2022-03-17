package domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SimilarPerfume {

    private final Long originId;

    private final Long similarId;

    @Builder
    private SimilarPerfume(Long originId, Long similarId) {
        this.originId = originId;
        this.similarId = similarId;
    }

    public static SimilarPerfume toSimilarPerfume(Long originId, Long similarId) {
        return SimilarPerfume.builder()
            .originId(originId)
            .similarId(similarId)
            .build();
    }
}
