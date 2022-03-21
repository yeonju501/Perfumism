import dao.PerfumeJdbcRepository;
import dao.PerfumeRepository;
import domain.MainAccord;
import java.io.FileReader;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class MainAccordsMain {

    public static void main(String[] args) {
        PerfumeRepository perfumeRepository = new PerfumeJdbcRepository();
        try {
            Object ob = new JSONParser().parse(new FileReader(PerfumeMain.PERFUME_JSON));
            JSONArray perfumes = (JSONArray) ob;
            for (int i = 0; i < perfumes.size(); i++) {
                JSONObject perfume = (JSONObject) perfumes.get(i);
                Long id = (Long) perfume.get("id");
                JSONArray mainAccordsJson = (JSONArray) perfume.get("main_accords");
                for(int j = 0; j < mainAccordsJson.size(); j++) {
                    Long accordId = perfumeRepository.findAccord((String) mainAccordsJson.get(j));
                    MainAccord mainAccord = MainAccord.toMainAccord(id, accordId);
                    perfumeRepository.saveMainAccord(mainAccord);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
