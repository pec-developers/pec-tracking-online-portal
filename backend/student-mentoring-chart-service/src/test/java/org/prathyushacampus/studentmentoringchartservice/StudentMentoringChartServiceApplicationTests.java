package org.prathyushacampus.studentmentoringchartservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class StudentMentoringChartServiceApplicationTests {

    @Test
    void contextLoads() {
    }

}
