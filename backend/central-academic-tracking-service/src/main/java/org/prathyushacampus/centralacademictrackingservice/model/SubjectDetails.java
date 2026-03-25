package org.prathyushacampus.centralacademictrackingservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "subject_details")
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDetails extends BaseAuditableEntity {

    /**
     * Natural primary key — human-readable code like "CS23301".
     */
    @Id
    @Column(name = "subject_code", updatable = false, nullable = false)
    private String subjectCode;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "credit", nullable = false)
    private double credit;

    @Column(name = "semester", nullable = false)
    private int semester;

    @Column(name = "year", nullable = false)
    private int year;

    /**
     * A subject can belong to multiple departments.
     * Stored as a native PostgreSQL JSONB array.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "department", columnDefinition = "jsonb", nullable = false)
    private List<Department> department;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private SubjectType type;
}
