package org.prathyushacampus.studentendprogramservice;

import org.springframework.boot.SpringApplication;

public class TestStudentEndProgramServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(StudentEndProgramServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
