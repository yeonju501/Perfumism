import dao.BrandJdbcRepository;
import dao.BrandRepository;
import domain.Brand;
import java.io.FileReader;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class BrandMain {

    public static final String PERFUME_BRAND_JSON = "src/main/resources/brand_data.json";

    public static void main(String[] args) throws Exception{
        BrandRepository brandRepository = new BrandJdbcRepository();

        Object ob = new JSONParser().parse(new FileReader(PERFUME_BRAND_JSON));

        JSONObject js = (JSONObject) ob;
        JSONObject brands = (JSONObject) js.get("brand");
        for(int i = 0; i < brands.size(); i++) {
            Brand brand = Brand.toBrand((String) brands.get(Integer.toString(i)));
            brandRepository.save(brand);
        }
    }
}
