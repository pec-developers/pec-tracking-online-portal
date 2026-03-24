package org.prathyushacampus.facultyservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
    name = "mentor_mentee_mappings",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_mentor_mentee_semester_year",
            columnNames = {"faculty_id", "student_id", "semester", "year"}
        )
    }
)
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentorMenteeMapping extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    /**
     * The faculty acting as mentor.
     * Referenced as "mentor-id" in downstream services.
     */
    @Column(name = "faculty_id", nullable = false)
    private UUID facultyId;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "semester", nullable = false)
    private int semester;

    @Column(name = "year", nullable = false)
    private int year;
}
