package dao;

import domain.Accord;
import domain.CategoryAccord;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import util.db.DBClose;
import util.db.DBConnection;

public class AccordJdbcRepository implements AccordRepository {

    @Override
    public void save(Accord accord) {
        PreparedStatement pstmt = null;
        try (Connection conn = DBConnection.getConnection()) {
            String sql = "insert into accord (kor_name, eng_name) values (?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, accord.getKor_name());
            pstmt.setString(2, accord.getEng_name());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(pstmt);
        }
    }

    @Override
    public void saveCategory(String name) {
        PreparedStatement pstmt = null;
        try (Connection conn = DBConnection.getConnection()) {
            String sql = "insert into category (name) values (?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void saveCategoryAccord(CategoryAccord categoryAccord) {
        PreparedStatement pstmt = null;
        try (Connection conn = DBConnection.getConnection()){
            String sql = "insert into category_accord (category_id, accord_id) values (?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, categoryAccord.getCategoryId());
            pstmt.setLong(2, categoryAccord.getAccordId());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
