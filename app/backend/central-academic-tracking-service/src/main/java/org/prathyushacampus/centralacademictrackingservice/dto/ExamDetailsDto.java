package org.prathyushacampus.centralacademictrackingservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.prathyushacampus.centralacademictrackingservice.model.SemesterType;

import java.util.List;

@Data
public class ExamDetailsDto {

    @JsonProperty("year")
    private int year;

    @JsonProperty("semester-type")
    private SemesterType semesterType;

    @JsonProperty("exams")
    private List<String> exams;

    @JsonProperty("internals")
    private List<String> internals;
}
