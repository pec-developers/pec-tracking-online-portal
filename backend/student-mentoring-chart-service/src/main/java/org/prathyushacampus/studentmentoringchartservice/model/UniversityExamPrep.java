package org.prathyushacampus.studentmentoringchartservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UniversityExamPrep {

    private ExamPrepItem previousYearQuestions;
    private ExamPrepItem questionBank;
    private ExamPrepItem materialCollection;
    private ExamPrepItem groupStudy;
    private ExamPrepItem extraCoaching;
}
