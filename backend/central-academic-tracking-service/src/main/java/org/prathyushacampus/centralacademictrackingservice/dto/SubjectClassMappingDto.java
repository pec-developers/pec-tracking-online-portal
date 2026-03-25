package org.prathyushacampus.centralacademictrackingservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.UUID;

@Data
public class SubjectClassMappingDto {

    @JsonProperty("class-id")
    private UUID classId;

    @JsonProperty("subject-code")
    private String subjectCode;

    @JsonProperty("semester")
    private int semester;

    @JsonProperty("year")
    private int year;
}
