package org.prathyushacampus.pectop.studentgeneralprofileservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class StudentGeneralProfileServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentGeneralProfileServiceApplication.class, args);
    }

}
