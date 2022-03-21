package util.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String SERVER_ADDRESS_PORT = "j6d105.p.ssafy.io:3306";
    private static final String DATABASE_NAME = "perfume";
    private static final String USER_ID = "root";
    private static final String USER_PASSWORD = "perfume";

    private DBConnection() {
    }

    public static Connection getConnection() throws SQLException {
        final String url = "jdbc:mysql://" + SERVER_ADDRESS_PORT
            + "/" + DATABASE_NAME + "?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8";
        return DriverManager.getConnection(url, USER_ID, USER_PASSWORD);
    }
}
