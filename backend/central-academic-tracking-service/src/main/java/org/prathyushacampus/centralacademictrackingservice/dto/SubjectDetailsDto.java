package org.prathyushacampus.centralacademictrackingservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.prathyushacampus.centralacademictrackingservice.model.Department;
import org.prathyushacampus.centralacademictrackingservice.model.SubjectType;

import java.util.List;

@Data
public class SubjectDetailsDto {

    @JsonProperty("subject-code")
    private String subjectCode;

    @JsonProperty("subject-name")
    private String subjectName;

    @JsonProperty("credit")
    private double credit;

    @JsonProperty("semester")
    private int semester;

    @JsonProperty("year")
    private int year;

    @JsonProperty("department")
    private List<Department> department;

    @JsonProperty("type")
    private SubjectType type;
}
