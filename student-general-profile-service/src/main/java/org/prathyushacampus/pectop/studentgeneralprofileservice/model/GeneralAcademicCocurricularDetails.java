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
public class GeneralAcademicCocurricularDetails {

    public enum StrengthLevel {
        VERY_WEAK, WEAK, AVERAGE, STRONG, VERY_STRONG
    }

    @Column(columnDefinition = "TEXT")
    private String branchFeedback;

    @Enumerated(EnumType.STRING)
    private StrengthLevel fundamentalMathStrength;

    @Enumerated(EnumType.STRING)
    private StrengthLevel fundamentalEnggStrength;

    private Boolean questioningCapability;

    @Column(columnDefinition = "TEXT")
    private String sportsInvolvement;

    @Column(columnDefinition = "TEXT")
    private String awardRecognitions;
}