package dao;

import domain.Accord;
import domain.CategoryAccord;

public interface AccordRepository {

    void save(Accord accord);

    void saveCategory(String name);

    void saveCategoryAccord(CategoryAccord categoryAccord);

}
