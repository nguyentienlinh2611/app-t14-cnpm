package rethinkdb;

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
    public void afterPropertiesSet(){
        createDb();
    }

    private void createDb() {
        Connection connection = connectionFactory.createConnection();
        List<String> dbList = r.dbList().run(connection);
        if (!dbList.contains("rubik_online")) {
            r.dbCreate("rubik_online").run(connection);
        }
        List<String> tables = r.db("rubik_online").tableList().run(connection);
        if (!tables.contains("records")) {
            r.db("rubik_online").tableCreate("records").run(connection);
        }
    }
}
