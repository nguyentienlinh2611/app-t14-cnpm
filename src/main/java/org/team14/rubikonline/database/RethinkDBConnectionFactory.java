package org.team14.rubikonline.database;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;

public class RethinkDBConnectionFactory {
    private String host;
    private int port=-1;
    
    public RethinkDBConnectionFactory(String host) {
        this.host = host;
    }
    
    public RethinkDBConnectionFactory(String host,int port) {
        this.host = host;
        this.port = port;
    }

    public Connection createConnection() {
    	if(port!=-1)
    		return RethinkDB.r.connection().hostname(host).port(port).connect();
    	else
    		return RethinkDB.r.connection().hostname(host).connect();
    }
}
