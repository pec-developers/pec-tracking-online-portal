package org.prathyushacampus.studentacademicperformanceservice;

import org.springframework.boot.SpringApplication;

public class TestStudentAcademicPerformanceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(StudentAcademicPerformanceServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
