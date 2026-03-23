package org.prathyushacampus.studentmentoringchartservice;

import org.springframework.boot.SpringApplication;

public class TestStudentMentoringChartServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(StudentMentoringChartServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
