package org.prathyushacampus.studentmentoringchartservice.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Examinations {

    private List<MonthlyTest> monthlyTests;
    private UniversityExamPrep universityExamPrep;
}
