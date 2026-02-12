package org.prathyushacampus.pectop.studentgeneralprofileservice;

import org.springframework.boot.SpringApplication;

public class TestStudentGeneralProfileServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(StudentGeneralProfileServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
