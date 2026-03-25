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
public class InternalExam {
    @JsonProperty("exam-type")
    private String examType;

    @JsonProperty("subject-list")
    private List<InternalExamSubject> subjectList;

    @JsonProperty("remarks")
    private String remarks;

    @JsonProperty("gpa")
    private Float gpa;

    @JsonProperty("working-days")
    private Integer workingDays;

    @JsonProperty("present-days")
    private Integer presentDays;

    @JsonProperty("absent-days")
    private Integer absentDays;

    @JsonProperty("leave-availed")
    private Integer leaveAvailed;

    @JsonProperty("medical-leave")
    private Integer medicalLeave;

    @JsonProperty("attendence-percentage")
    private Float attendancePercentage;

    @JsonProperty("student-signature")
    private Boolean studentSignature;
}
