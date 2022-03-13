package com.ladder.perfumism.perfume.util;

import com.ladder.perfumism.perfume.domain.Brand;

public class BrandFixture {

    public static final Long BRAND_ID = 1L;
    public static final String BRAND_NAME = "18 21 Man Made";

    public static Brand createBrand(Long brandId, String brandName) {
        return new Brand(brandId, brandName);
    }
}
