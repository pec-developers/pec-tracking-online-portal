package org.prathyushacampus.studentendprogramservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EndProgramCreationDto {

    @JsonProperty("student-id")
    private UUID studentId;

    @JsonProperty("department")
    private String department;

    @JsonProperty("batch")
    private String batch;
}
