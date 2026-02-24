package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "student_misc_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentMiscDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(name = "mother_tongue")
    private String motherTongue;

    @ElementCollection
    @CollectionTable(name = "student_known_languages", joinColumns = @JoinColumn(name = "student_misc_id"))
    @Column(name = "language")
    private List<String> otherKnownLanguages;

    @Enumerated(EnumType.STRING)
    @Column(name = "mode_of_admission")
    private ModeOfAdmission modeOfAdmission;

    @Enumerated(EnumType.STRING)
    @Column(name = "dietary_preference")
    private DietaryPreference dietaryPreference;

    @Column(name = "vision_problem")
    private Boolean visionProblem;

    @Column(name = "chronic_illness", columnDefinition = "TEXT")
    private String chronicIllness;

    public enum ModeOfAdmission {
        COUNSELING, MANAGEMENT
    }

    public enum DietaryPreference {
        VEG, NON_VEG
    }
}
