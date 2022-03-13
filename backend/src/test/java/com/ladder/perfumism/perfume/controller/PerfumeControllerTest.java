package com.ladder.perfumism.perfume.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

// Controller Test 에서는 data.sql 에 작성했던 데이터를 불러오기에 조심히 다뤄야 한다.
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("PerfumeController Test")
public class PerfumeControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    @DisplayName("GET /api/perfumes/{perfume_id}")
    public void getPerfumeDetailTest() throws Exception {
        // data.sql 의 데이터를 불러오기에 1번 ID 를 참조했다.
        String id = "1";
        // 만일 본인이 data.sql 이 없다면 임시 데이터 작성 후 테스트 하길 바람.

        // 아래의 get, status, jsonPath 등등 모두 MockMvcResultMatchers 에서 static으로 가져온 것이다.
        ResultActions resultActions = mvc.perform(get("/api/perfumes/" + id))
            .andExpect(status().isOk()) // httpCode를 파악하는 구문
            // 받은 json 하나하나 파악하고 싶다면
            .andExpect(jsonPath("perfume_id").value(1))
            // 이런식으로 추가할 수 있다.
            .andDo(print()); // 받은 Response 의 내용을 모두 콘솔에 표시
    }
}