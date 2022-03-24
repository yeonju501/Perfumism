package com.ladder.perfumism.perfume.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    List<Brand> findByNameStartsWithIgnoreCase(String keyword);

}
