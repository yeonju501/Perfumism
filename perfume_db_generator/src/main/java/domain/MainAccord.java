package domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MainAccord {

    private final Long perfumeId;

    private final Long accordId;

    private final int value;

    @Builder
    private MainAccord(Long perfumeId, Long accordId, int value) {
        this.perfumeId = perfumeId;
        this.accordId = accordId;
        this.value = value;
    }

    public static MainAccord toMainAccord(Long perfumeId, Long accordId, int value) {
        return MainAccord.builder()
            .perfumeId(perfumeId)
            .accordId(accordId)
            .value(value)
            .build();
    }
}
