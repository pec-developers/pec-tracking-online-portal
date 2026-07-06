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
public class LivingStyle {

    public enum CommunicationFrequency {
        DAILY, WEEKLY, OCCASIONALLY
    }

    @Enumerated(EnumType.STRING)
    private CommunicationFrequency yourCommunicationToParent;

    @Enumerated(EnumType.STRING)
    private CommunicationFrequency parentCommunicationToYou;

    @Column(columnDefinition = "TEXT")
    private String weekendPlans;

    @Column(columnDefinition = "TEXT")
    private String roommatesDescription;

    @Column(columnDefinition = "TEXT")
    private String hostelEnvironmentDescription;
}