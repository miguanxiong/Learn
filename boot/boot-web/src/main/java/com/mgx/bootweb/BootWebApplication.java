package com.mgx.bootweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BootWebApplication {

    public static void main(String[] args) {

        SpringApplication.run(BootWebApplication.class, args);
    }

}
