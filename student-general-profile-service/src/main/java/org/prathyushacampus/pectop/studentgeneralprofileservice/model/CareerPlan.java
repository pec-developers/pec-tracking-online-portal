package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CareerPlan {
    
    public enum CareerChoice {
        HIGHER_STUDIES, JOB, ENTREPRENEUR
    }

    @ElementCollection(targetClass = CareerChoice.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "student_career_choices", joinColumns = @JoinColumn(name = "student_ambition_id"))
    @Column(name = "career_choice")
    private Set<CareerChoice> careerChoices;

    @Column(columnDefinition = "TEXT")
    private String careerPrepPlan;

    @Column(columnDefinition = "TEXT")
    private String extraCoachingDetails;

    @Column(columnDefinition = "TEXT")
    private String helpNeeded;
}
