package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CareerPlan {
    
    public enum CareerChoice {
        HIGHER_STUDIES, JOB, ENTREPRENEUR
    }

    @Enumerated(EnumType.STRING)
    private CareerChoice careerChoice;

    @Column(columnDefinition = "TEXT")
    private String careerPrepPlan;

    @Column(columnDefinition = "TEXT")
    private String extraCoachingDetails;

    @Column(columnDefinition = "TEXT")
    private String helpNeeded;
}