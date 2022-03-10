package com.ladder.perfumism.article.controller;

import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
public class ArticleRestController {

    @PostMapping("/create")
    public ResponseEntity<Void> createArticle(){

        URI uri = URI.create("api/articles/create");
        return ResponseEntity.created(uri).build();
    }
}
