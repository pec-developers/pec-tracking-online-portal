package org.prathyushacampus.facultyservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.prathyushacampus.facultyservice.model.Department;
import org.prathyushacampus.facultyservice.model.FacultyType;

import java.util.List;

@Data
public class FacultyCreationDto {

    @JsonProperty("name")
    private String name;

    /**
     * A faculty member can hold multiple roles simultaneously.
     * e.g., ["MENTOR", "CLASS_COORDINATOR"]
     */
    @JsonProperty("type")
    private List<FacultyType> type;

    @JsonProperty("department")
    private Department department;
}
