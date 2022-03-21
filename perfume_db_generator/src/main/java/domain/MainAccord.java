package domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MainAccord {

    private final Long perfumeId;

    private final Long accordId;


    @Builder
    private MainAccord(Long perfumeId, Long accordId) {
        this.perfumeId = perfumeId;
        this.accordId = accordId;
    }

    public static MainAccord toMainAccord(Long perfumeId, Long accordId) {
        return MainAccord.builder()
            .perfumeId(perfumeId)
            .accordId(accordId)
            .build();
    }
}
