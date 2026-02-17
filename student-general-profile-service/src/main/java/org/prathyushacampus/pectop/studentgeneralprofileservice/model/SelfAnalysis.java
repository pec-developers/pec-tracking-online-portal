package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

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
public class SelfAnalysis {
    @Column(columnDefinition = "TEXT")
    private String academicStrength;

    @Column(columnDefinition = "TEXT")
    private String generalStrength;

    @Column(columnDefinition = "TEXT")
    private String academicWeakness;

    @Column(columnDefinition = "TEXT")
    private String generalWeakness;
}