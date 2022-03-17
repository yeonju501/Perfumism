package domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CategoryAccord {

    private final Long categoryId;

    private final Long accordId;

    @Builder
    private CategoryAccord(Long categoryId, Long accordId) {
        this.categoryId = categoryId;
        this.accordId = accordId;
    }

    public static CategoryAccord toCategoryAccord(Long categoryId, Long accordId) {
        return CategoryAccord.builder()
            .categoryId(categoryId)
            .accordId(accordId)
            .build();
    }
}
