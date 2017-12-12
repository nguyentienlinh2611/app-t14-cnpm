package org.team14.rubikonline.database;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RethinkDBConfiguration {
    public static final String DBHOST = "127.0.0.1";

    @Bean
    public RethinkDBConnectionFactory connectionFactory() {
        return new RethinkDBConnectionFactory(DBHOST);
    }

    @Bean
    DbInitializer dbInitializer() {
        return new DbInitializer();
    }
}
