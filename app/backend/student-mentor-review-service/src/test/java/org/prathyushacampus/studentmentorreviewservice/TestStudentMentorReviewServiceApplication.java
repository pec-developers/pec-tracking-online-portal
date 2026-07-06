package org.prathyushacampus.studentmentorreviewservice;

import org.springframework.boot.SpringApplication;

public class TestStudentMentorReviewServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(StudentMentorReviewServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
