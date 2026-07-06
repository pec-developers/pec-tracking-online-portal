package org.prathyushacampus.studentpersemestermentoringactivityservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity
@Table(
    name = "mentoring_activity_t",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_student_semester_year",
        columnNames = {"student_id", "semester", "year"}
    )
)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentoringActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(nullable = false)
    private Integer semester;

    @Column(nullable = false)
    private Integer year;

    @Embedded
    private PersonalReview personalReview;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<SubjectWiseProblem> subjectWiseProblems;

    @Embedded
    private SpecialNeed specialNeed;

    @Embedded
    private LabCourse labCourse;

    @ElementCollection
    @CollectionTable(name = "mentoring_arrear", joinColumns = @JoinColumn(name = "mentoring_activity_id"))
    private List<Arrear> arrears;

    @Embedded
    private Library library;

    @Embedded
    private SelfDevelopment selfDevelopment;
}
