package org.team14.rubikonline.database;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class DbInitializer implements InitializingBean {
    @Autowired
    private RethinkDBConnectionFactory connectionFactory;

    private static final RethinkDB r = RethinkDB.r;

    @Override
    public void afterPropertiesSet() throws Exception {
        createDb();
    }

    private void createDb() {
        Connection connection = connectionFactory.createConnection();
        List<String> dbList = r.dbList().run(connection);
        if (!dbList.contains("rubikonline")) {
            r.dbCreate("rubikonline").run(connection);
        }
        List<String> tables = r.db("rubikonline").tableList().run(connection);
        if (!tables.contains("records")) {
            r.db("rubikonline").tableCreate("records").run(connection);
            //khóa phụ là tên người dùng
            r.db("rubikonline").table("records").indexCreate("userName").run(connection);
        }
    }
}
