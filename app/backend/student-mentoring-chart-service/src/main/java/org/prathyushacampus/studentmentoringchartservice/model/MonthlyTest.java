package org.prathyushacampus.studentmentoringchartservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyTest {

    private String testId;
    private ExamAspect attendance;
    private ExamAspect seriousness;
    private ExamAspect preparations;
    private ExamAspect materialCollection;
    private ExamAspect recordKeeping;
}
