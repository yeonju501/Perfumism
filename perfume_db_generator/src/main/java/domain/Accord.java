package domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Accord {

    private final String kor_name;

    private final String eng_name;

    @Builder
    private Accord(String kor_name, String eng_name){
        this.kor_name = kor_name;
        this.eng_name = eng_name;
    }

    public static Accord toAccord(String kor_name, String eng_name) {
        return Accord.builder()
            .kor_name(kor_name)
            .eng_name(eng_name)
            .build();
    }
}
