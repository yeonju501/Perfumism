package domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Brand {

    private final String name;

    @Builder
    private Brand(String name) {
        this.name = name;
    }

    public static Brand toBrand(String name) {
        return Brand.builder()
            .name(name)
            .build();
    }
}
