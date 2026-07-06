package org.prathyushacampus.centralacademictrackingservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity
@Table(
    name = "exam_details",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_exam_year_semester_type",
            columnNames = {"year", "semester_type"}
        )
    }
)
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamDetails extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "year", nullable = false)
    private int year;

    @Enumerated(EnumType.STRING)
    @Column(name = "semester_type", nullable = false)
    private SemesterType semesterType;

    /**
     * List of exam names for this semester, e.g. ["IAT1", "UT1", "IAT2", "MODEL"].
     * Stored as a native PostgreSQL JSONB array.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "exams", columnDefinition = "jsonb", nullable = false)
    private List<String> exams;

    /**
     * List of internal assessment names, e.g. ["A1", "A2", "GP1", "P1"].
     * Stored as a native PostgreSQL JSONB array.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "internals", columnDefinition = "jsonb", nullable = false)
    private List<String> internals;
}
