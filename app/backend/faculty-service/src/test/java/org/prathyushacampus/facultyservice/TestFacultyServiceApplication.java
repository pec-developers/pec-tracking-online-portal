package org.prathyushacampus.facultyservice;

import org.springframework.boot.SpringApplication;

public class TestFacultyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(FacultyServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
