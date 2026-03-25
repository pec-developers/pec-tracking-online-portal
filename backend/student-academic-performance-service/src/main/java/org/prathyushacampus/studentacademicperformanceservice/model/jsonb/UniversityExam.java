package org.prathyushacampus.studentacademicperformanceservice.model.jsonb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UniversityExam {
    @JsonProperty("subject-list")
    private List<UniversityExamSubject> subjectList;

    @JsonProperty("gpa")
    private Float gpa;
}
