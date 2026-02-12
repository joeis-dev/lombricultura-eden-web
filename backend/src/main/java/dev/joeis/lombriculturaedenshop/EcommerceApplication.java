package dev.joeis.lombriculturaedenshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LombriculturaedenShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(LombriculturaedenShopApplication.class, args);
    }
}
