import dao.AccordJdbcRepository;
import dao.AccordRepository;
import domain.Accord;
import java.io.FileReader;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class AccordMain {

    public static final String PERFUME_ACCORD_JSON_ENG = "src/main/resources/accord_data_eng.json";
    public static final String PERFUME_ACCORD_JSON_KOR = "src/main/resources/accord_data_kor.json";

    public static void main(String[] args) throws Exception{
        AccordRepository accordRepository = new AccordJdbcRepository();

        Object ob = new JSONParser().parse(new FileReader(PERFUME_ACCORD_JSON_ENG));
        Object ob2 = new JSONParser().parse(new FileReader(PERFUME_ACCORD_JSON_KOR));

        JSONObject js = (JSONObject) ob;
        JSONObject accordsEng = (JSONObject) js.get("accords");
        JSONObject js2 = (JSONObject) ob2;
        JSONObject accordsKor = (JSONObject) js2.get("accords");
        for(int i = 0; i < accordsEng.size(); i++){
            Accord accord = Accord.toAccord((String) accordsKor.get(Integer.toString(i)), (String)accordsEng.get(Integer.toString(i)));
            accordRepository.save(accord);
        }
    }
}
