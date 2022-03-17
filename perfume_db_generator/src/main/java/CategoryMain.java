import dao.AccordJdbcRepository;
import dao.AccordRepository;

public class CategoryMain {

    public static String[] categories = {"프루티", "플로럴", "시트러스", "우디", "그린", "아쿠아", "스위트", "파우더리", "부드러운", "오리엔탈"};

    public static void main(String[] args) {
        AccordRepository accordRepository = new AccordJdbcRepository();
        for(int i = 0; i < categories.length; i++) {
            accordRepository.saveCategory(categories[i]);
        }
    }
}
