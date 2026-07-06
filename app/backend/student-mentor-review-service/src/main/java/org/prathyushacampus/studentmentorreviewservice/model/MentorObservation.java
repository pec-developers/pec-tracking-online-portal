package org.prathyushacampus.studentmentorreviewservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentorObservation {

    private String overallRemarks;
    private String disciplinary;
    private String specialObservation;
    private String followUpDetails;
}
