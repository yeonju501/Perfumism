package com.ladder.perfumism;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PerfumismApplication {

	public static void main(String[] args) {
		SpringApplication.run(PerfumismApplication.class, args);
	}

}
