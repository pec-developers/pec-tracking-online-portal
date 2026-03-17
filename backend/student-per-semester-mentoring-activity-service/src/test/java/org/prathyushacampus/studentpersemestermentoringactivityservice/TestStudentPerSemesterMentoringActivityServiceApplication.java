package org.prathyushacampus.studentpersemestermentoringactivityservice;

import org.springframework.boot.SpringApplication;

public class TestStudentPerSemesterMentoringActivityServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(StudentPerSemesterMentoringActivityServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
