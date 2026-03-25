package org.prathyushacampus.centralacademictrackingservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.prathyushacampus.centralacademictrackingservice.model.Department;

import java.util.UUID;

@Data
public class SubjectFacultyMappingDto {

    @JsonProperty("faculty-id")
    private UUID facultyId;

    @JsonProperty("subject-code")
    private String subjectCode;

    @JsonProperty("department")
    private Department department;

    @JsonProperty("class-id")
    private UUID classId;

    @JsonProperty("semester")
    private int semester;

    @JsonProperty("year")
    private int year;
}
