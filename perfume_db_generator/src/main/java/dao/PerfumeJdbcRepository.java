package dao;

import domain.MainAccord;
import domain.Perfume;
import domain.SimilarPerfume;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import util.db.DBClose;
import util.db.DBConnection;

public class PerfumeJdbcRepository implements PerfumeRepository {

    @Override
    public void save(Perfume perfume) {
        PreparedStatement pstmt = null;
        try (Connection conn = DBConnection.getConnection()) {
            String sql =
                "insert into perfume (perfume_id, brand_id, name, image, launch_year, average_grade, top_notes, middle_notes, base_notes, total_survey, longevity, sillage) "
                    + "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, perfume.getPerfumeId());
            pstmt.setLong(2, perfume.getBrandId());
            pstmt.setString(3, perfume.getName());
            pstmt.setString(4, perfume.getImage());
            pstmt.setInt(5, perfume.getLaunchYear());
            pstmt.setDouble(6, perfume.getAverageGrade());
            pstmt.setString(7, perfume.getTopNotes());
            pstmt.setString(8, perfume.getMiddleNotes());
            pstmt.setString(9, perfume.getBaseNotes());
            pstmt.setInt(10, perfume.getTotalSurvey());
            pstmt.setString(11, perfume.getLongevity());
            pstmt.setString(12, perfume.getSillage());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(pstmt);
        }
    }

    @Override
    public Long findBrand(String brandName) {
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try (Connection conn = DBConnection.getConnection()){
            String sql = "select brand_id from brand where name = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, brandName);
            rs = pstmt.executeQuery();
            rs.next();
            return rs.getLong(1);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(pstmt);
        }
        return null;
    }

    @Override
    public void saveMainAccord(MainAccord mainAccord) {
        PreparedStatement pstmt = null;
        try (Connection conn = DBConnection.getConnection()) {
            String sql = "insert into perfume_accord (perfume_id, accord_id, value) values (?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, mainAccord.getPerfumeId());
            pstmt.setLong(2, mainAccord.getAccordId());
            pstmt.setInt(3, mainAccord.getValue());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(pstmt);
        }
    }

    @Override
    public Long findAccord(String name) {
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try (Connection conn = DBConnection.getConnection()) {
            String sql = "select accord_id from accord where eng_name = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);
            rs = pstmt.executeQuery();
            rs.next();
            return rs.getLong(1);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(pstmt);
        }
        return null;
    }

    @Override
    public void saveSimilarPerfume(SimilarPerfume similarPerfume) {
        PreparedStatement pstmt = null;
        try (Connection conn = DBConnection.getConnection()) {
            String sql = "insert into similar_perfume (origin_id, similar_id) values (?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, similarPerfume.getOriginId());
            pstmt.setLong(2, similarPerfume.getSimilarId());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(pstmt);
        }
    }


}
