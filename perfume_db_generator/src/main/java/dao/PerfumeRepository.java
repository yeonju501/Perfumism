package dao;

import domain.MainAccord;
import domain.Perfume;
import domain.SimilarPerfume;

public interface PerfumeRepository {

    void save(Perfume perfume);

    Long findBrand(String brandName);

    void saveMainAccord(MainAccord mainAccord);

    Long findAccord(String name);

    void saveSimilarPerfume(SimilarPerfume similarPerfume);

}
