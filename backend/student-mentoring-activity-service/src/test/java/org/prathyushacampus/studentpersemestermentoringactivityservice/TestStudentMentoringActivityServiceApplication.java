package org.prathyushacampus.studentpersemestermentoringactivityservice;

import org.springframework.boot.SpringApplication;

public class TestStudentMentoringActivityServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(StudentMentoringActivityServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
