package org.prathyushacampus.centralacademictrackingservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.prathyushacampus.centralacademictrackingservice.model.Department;

@Data
public class ClassDetailsDto {

    @JsonProperty("section")
    private String section;

    @JsonProperty("current-year")
    private int currentYear;

    @JsonProperty("current-semester")
    private int currentSemester;

    @JsonProperty("department")
    private Department department;
}
