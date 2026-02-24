package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_ambition_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentAmbitionDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Embedded
    private PersonalAmbition personalAmbition;

    @Embedded
    private CareerPlan careerPlan;

    @Embedded
    private SelfAnalysis selfAnalysis;

    @Embedded
    private LivingStyle livingStyle;

    @Embedded
    private GeneralAcademicCocurricularDetails generalAcademicDetails;
}
