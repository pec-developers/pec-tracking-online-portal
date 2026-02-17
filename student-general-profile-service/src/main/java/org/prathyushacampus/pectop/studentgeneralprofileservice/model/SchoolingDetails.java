package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import jakarta.persistence.Embeddable;
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
public class SchoolingDetails {
    private String schoolName;
    private String board;
    private String medium;
    private Integer scoredMark;
    private Integer totalMark;

    @AssertTrue(message = "Scored mark must be less than or equal to total mark")
    private boolean isScoredMarkValid() {
        if (scoredMark == null || totalMark == null) return true;
        return scoredMark <= totalMark;
    }
}