package dao;

import domain.Brand;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import util.db.DBClose;
import util.db.DBConnection;

public class BrandJdbcRepository implements BrandRepository {

    @Override
    public void save(Brand brand) {
        PreparedStatement pstmt = null;
        try (Connection conn = DBConnection.getConnection()){
            String sql = "insert into brand (name) values (?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, brand.getName());
            pstmt.executeUpdate();
        } catch (SQLException e){
            e.printStackTrace();
        } finally {
            DBClose.close(pstmt);
        }
    }
}
