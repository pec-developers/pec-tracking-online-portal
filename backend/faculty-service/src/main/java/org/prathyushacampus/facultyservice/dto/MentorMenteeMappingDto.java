package org.prathyushacampus.facultyservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.UUID;

@Data
public class MentorMenteeMappingDto {

    /**
     * The faculty acting as mentor.
     * Referred to as "mentor-id" in downstream per-semester services.
     */
    @JsonProperty("faculty-id")
    private UUID facultyId;

    @JsonProperty("student-id")
    private UUID studentId;

    @JsonProperty("semester")
    private int semester;

    @JsonProperty("year")
    private int year;
}
