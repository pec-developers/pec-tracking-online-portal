package org.prathyushacampus.centralacademictrackingservice;

import org.springframework.boot.SpringApplication;

public class TestCentralAcademicTrackingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(CentralAcademicTrackingServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
