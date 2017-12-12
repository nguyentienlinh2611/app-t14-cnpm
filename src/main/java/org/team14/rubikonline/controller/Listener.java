package org.team14.rubikonline.controller;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Cursor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.team14.rubikonline.database.RethinkDBConnectionFactory;
import org.team14.rubikonline.object.Record;

@Service
public class Listener {

    @Autowired
    private RethinkDBConnectionFactory connectionFactory;

    @Autowired
    private SimpMessagingTemplate webSocket;

    @Async
    public void pushChangesToWebSocket() {
        Cursor<Record> cursor = RethinkDB.r.db("rubikonline").table("records").changes()
                .getField("new_val")
                .run(connectionFactory.createConnection(), Record.class);

        while (cursor.hasNext()) {
            Record record = cursor.next();
            webSocket.convertAndSend("/topic/records", record);
        }
    }

}

