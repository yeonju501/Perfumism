
import dao.PerfumeJdbcRepository;
import dao.PerfumeRepository;
import domain.Perfume;
import java.io.FileReader;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class PerfumeMain {

    public static final String PERFUME_JSON = "src/main/resources/perfume_data.json";

    public static void main(String[] args) {

        PerfumeRepository perfumeRepository = new PerfumeJdbcRepository();
        try {
            Object ob = new JSONParser().parse(new FileReader(PERFUME_JSON));
            JSONArray perfumes = (JSONArray) ob;
            for (int i = 0; i < perfumes.size(); i++) {
                JSONObject perfume = (JSONObject) perfumes.get(i);
                Long id = (Long) perfume.get("id");
                Long brandId = (Long) perfumeRepository.findBrand((String) perfume.get("brand"));
                String perfumeName = (String) perfume.get("perfume");
                String imageData = (String) perfume.get("image");
                String image = imageData.substring(2);
                Double launchYearDouble = (Double) perfume.get("launch_year");
                Integer launchYear = 0;
                if (Objects.nonNull(launchYearDouble)){
                    launchYear = launchYearDouble.intValue();
                }
                Double average_grade = 0.0;
                String topNotes = null;
                String middleNotes = null;
                String baseNotes = null;
                if (perfume.get("notes") instanceof JSONArray) {
                    JSONArray notes = (JSONArray) perfume.get("notes");
                    topNotes = StringUtils.join(notes, ", ");
                    middleNotes = "";
                    baseNotes = "";
                } else {
                    JSONObject Notes = (JSONObject) perfume.get("notes");
                    JSONArray topNotesJson = (JSONArray) Notes.get("top");
                    JSONArray middleNotesJson = (JSONArray) Notes.get("middle");
                    JSONArray baseNotesJSon = (JSONArray) Notes.get("base");
                    topNotes = StringUtils.join(topNotesJson, ", ");
                    middleNotes = StringUtils.join(middleNotesJson, ", ");
                    baseNotes = StringUtils.join(baseNotesJSon, ", ");
                }
                String longevity = (String) perfume.get("longevity");
                String sillage = (String) perfume.get("sillage");
                Long totalSurveyLong = (Long) perfume.get("total_survey");
                Integer totalSurvey = totalSurveyLong.intValue();
                int totalLike = 0;

                Perfume p = Perfume.toPerfume(id, brandId, perfumeName, image, launchYear, average_grade, topNotes, middleNotes, baseNotes,
                    totalSurvey, totalLike, longevity, sillage);
                perfumeRepository.save(p);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
