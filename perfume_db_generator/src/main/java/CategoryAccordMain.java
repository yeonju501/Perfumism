import dao.AccordJdbcRepository;
import dao.AccordRepository;
import domain.CategoryAccord;

public class CategoryAccordMain {

    public static int[][] accords = {
        {8, 70, 80},
        {10, 16, 29, 32, 33, 52, 53, 72, 73, 74, 76},
        {6, 29, 58, 70},
        {4, 5, 18, 49, 50, 53},
        {4, 5, 30, 35, 53, 71, 75},
        {25, 83, 85},
        {3, 8, 17, 19, 22, 27, 38, 47, 54, 56, 59, 68, 70, 80},
        {1, 21, 54, 57, 59, 73},
        {17, 19, 22, 26, 54, 55, 84},
        {3, 7, 17, 24, 43, 47, 53, 67, 71, 78, 79}
    };

    public static void main(String[] args) {
        AccordRepository accordRepository = new AccordJdbcRepository();
        for (int i = 0; i < accords.length; i++) {
            for (int j = 0; j < accords[i].length; j++) {
                CategoryAccord categoryAccord = CategoryAccord.toCategoryAccord(Long.valueOf(i+1), Long.valueOf(accords[i][j]));
                accordRepository.saveCategoryAccord(categoryAccord);
            }
        }
    }
}
