package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.AssertTrue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiplomaDetails {
    private String institutionName;
    private String branch;
    @Enumerated(EnumType.STRING)
    private GradeSystem gradeSystem;
    private Integer scoredMark;
    private Integer totalMark;

    @AssertTrue(message = "Scored mark must be less than or equal to total mark")
    private boolean isScoredMarkValid() {
        if (scoredMark == null || totalMark == null) return true;
        return scoredMark <= totalMark;
    }
}