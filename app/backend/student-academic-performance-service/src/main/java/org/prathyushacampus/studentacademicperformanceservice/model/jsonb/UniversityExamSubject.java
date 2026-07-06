package org.prathyushacampus.studentacademicperformanceservice.model.jsonb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UniversityExamSubject {
    @JsonProperty("subject-code")
    private String subjectCode;

    @JsonProperty("subject-name")
    private String subjectName;

    @JsonProperty("credit")
    private String credit;

    @JsonProperty("grade")
    private String grade;

    @JsonProperty("result")
    private String result;
}
