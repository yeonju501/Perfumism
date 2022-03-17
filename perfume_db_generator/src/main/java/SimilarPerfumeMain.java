import dao.PerfumeJdbcRepository;
import dao.PerfumeRepository;
import domain.SimilarPerfume;
import java.io.FileReader;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class SimilarPerfumeMain {

    public static void main(String[] args) {
        PerfumeRepository perfumeRepository = new PerfumeJdbcRepository();
        try {
            Object ob = new JSONParser().parse(new FileReader(PerfumeMain.PERFUME_JSON));
            JSONArray perfumes = (JSONArray) ob;
            for (int i = 0; i < perfumes.size(); i++) {
                JSONObject perfume = (JSONObject) perfumes.get(i);
                Long id = (Long) perfume.get("id");
                JSONArray similarPerfumes = (JSONArray) perfume.get("similar_perfume");
                for (int j = 0; j < similarPerfumes.size(); j++) {
                    Long similarId = (Long) similarPerfumes.get(j);
                    SimilarPerfume similarPerfume = SimilarPerfume.toSimilarPerfume(id, similarId);
                    perfumeRepository.saveSimilarPerfume(similarPerfume);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
