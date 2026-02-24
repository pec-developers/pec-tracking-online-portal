package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.Max;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SslcInterDetails {
    private String schoolName;
    private String board;
    private String medium;

    @Max(value = 100, message = "Math mark must be less than or equal to 100")
    private Integer mathMark;

    @Max(value = 100, message = "Physics mark must be less than or equal to 100")
    private Integer phyMark;

    @Max(value = 100, message = "Chemistry mark must be less than or equal to 100")
    private Integer chemMark;

    @Max(value = 100, message = "CS/Biology mark must be less than or equal to 100")
    private Integer csBioMark;

    @Max(value = 200, message = "Cutoff mark must be less than or equal to 200")
    @Setter(AccessLevel.NONE)
    private Double cutoffMark;

    @PrePersist
    @PreUpdate
    private void calculateCutoff() {
        if (mathMark != null && phyMark != null && chemMark != null) {
            this.cutoffMark = mathMark + ((phyMark + chemMark) / 2.0);
        }
    }
}
