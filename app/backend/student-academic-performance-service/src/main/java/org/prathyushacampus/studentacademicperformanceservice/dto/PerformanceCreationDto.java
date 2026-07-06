package org.prathyushacampus.studentacademicperformanceservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceCreationDto {

    @JsonProperty("student-id")
    private UUID studentId;

    @JsonProperty("semester")
    private Integer semester;

    @JsonProperty("year")
    private Integer year;

    @JsonProperty("class-id")
    private UUID classId;

    @JsonProperty("subject-code-list")
    private List<String> subjectCodeList;

    @JsonProperty("exams-list")
    private List<String> examsList;

    @JsonProperty("internal-list")
    private List<String> internalList;
}
