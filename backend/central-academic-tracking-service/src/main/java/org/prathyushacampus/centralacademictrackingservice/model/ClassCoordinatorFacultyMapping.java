package org.prathyushacampus.centralacademictrackingservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
    name = "class_coordinator_faculty_mappings",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_coordinator_class_semester_year",
            columnNames = {"faculty_id", "class_id", "semester", "year"}
        )
    }
)
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassCoordinatorFacultyMapping extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "faculty_id", nullable = false)
    private UUID facultyId;

    @Column(name = "class_id", nullable = false)
    private UUID classId;

    @Column(name = "semester", nullable = false)
    private int semester;

    @Column(name = "year", nullable = false)
    private int year;
}
