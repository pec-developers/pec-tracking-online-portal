package org.prathyushacampus.studentpersemestermentoringactivityservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabCourse {

    @Column(name = "understanding_concept", columnDefinition = "TEXT")
    private String understandingConcept;

    @Column(columnDefinition = "TEXT")
    private String keenness;

    @Column(name = "punctuality_in_submission", columnDefinition = "TEXT")
    private String punctualityInSubmission;
}
