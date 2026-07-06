package org.prathyushacampus.centralacademictrackingservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.UUID;

@Data
public class ClassCoordinatorFacultyMappingDto {

    @JsonProperty("faculty-id")
    private UUID facultyId;

    @JsonProperty("class-id")
    private UUID classId;

    @JsonProperty("semester")
    private int semester;

    @JsonProperty("year")
    private int year;
}
