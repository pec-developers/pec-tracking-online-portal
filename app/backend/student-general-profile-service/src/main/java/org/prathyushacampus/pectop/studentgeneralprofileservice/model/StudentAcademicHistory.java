package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_academic_history_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(name = "is_lateral_entry")
    private Boolean isLateralEntry;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "schoolName", column = @Column(name = "hsc_school_name")),
        @AttributeOverride(name = "board", column = @Column(name = "hsc_board")),
        @AttributeOverride(name = "medium", column = @Column(name = "hsc_medium")),
        @AttributeOverride(name = "scoredMark", column = @Column(name = "hsc_scored_mark")),
        @AttributeOverride(name = "totalMark", column = @Column(name = "hsc_total_mark"))
    })
    private SchoolingDetails hscDetails;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "schoolName", column = @Column(name = "sslc_school_name")),
        @AttributeOverride(name = "board", column = @Column(name = "sslc_board")),
        @AttributeOverride(name = "medium", column = @Column(name = "sslc_medium")),
        @AttributeOverride(name = "mathMark", column = @Column(name = "sslc_math_mark")),
        @AttributeOverride(name = "phyMark", column = @Column(name = "sslc_phy_mark")),
        @AttributeOverride(name = "chemMark", column = @Column(name = "sslc_chem_mark")),
        @AttributeOverride(name = "csBioMark", column = @Column(name = "sslc_cs_bio_mark")),
        @AttributeOverride(name = "cutoffMark", column = @Column(name = "sslc_cutoff_mark"))
    })
    private SslcInterDetails sslcInterDetails;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "institutionName", column = @Column(name = "diploma_institution_name")),
        @AttributeOverride(name = "branch", column = @Column(name = "diploma_branch")),
        @AttributeOverride(name = "gradeSystem", column = @Column(name = "diploma_grade_system")),
        @AttributeOverride(name = "scoredMark", column = @Column(name = "diploma_scored_mark")),
        @AttributeOverride(name = "totalMark", column = @Column(name = "diploma_total_mark"))
    })
    private DiplomaDetails diplomaDetails;

    @PrePersist
    @PreUpdate
    private void validateLateralEntryConsistency() {
        if (Boolean.TRUE.equals(isLateralEntry)) {
            if (diplomaDetails == null) {
                throw new IllegalStateException("Diploma details are required when lateral entry is true.");
            }
            if (sslcInterDetails != null) {
                throw new IllegalStateException("SSLC/Inter details must be null when lateral entry is true.");
            }
        } else {
            if (sslcInterDetails == null) {
                throw new IllegalStateException("SSLC/Inter details are required when lateral entry is false.");
            }
            if (diplomaDetails != null) {
                throw new IllegalStateException("Diploma details must be null when lateral entry is false.");
            }
        }
    }
}
