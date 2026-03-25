package org.prathyushacampus.centralacademictrackingservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
    name = "subject_faculty_mappings",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_subject_faculty_class_semester_year",
            columnNames = {"faculty_id", "subject_code", "class_id", "semester", "year"}
        )
    }
)
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectFacultyMapping extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "faculty_id", nullable = false)
    private UUID facultyId;

    @Column(name = "subject_code", nullable = false)
    private String subjectCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "department", nullable = false)
    private Department department;

    @Column(name = "class_id", nullable = false)
    private UUID classId;

    @Column(name = "semester", nullable = false)
    private int semester;

    @Column(name = "year", nullable = false)
    private int year;
}
