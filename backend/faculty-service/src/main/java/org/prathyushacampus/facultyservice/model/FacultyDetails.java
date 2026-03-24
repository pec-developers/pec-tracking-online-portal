package org.prathyushacampus.facultyservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "faculty_details")
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FacultyDetails extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "faculty_id", updatable = false, nullable = false)
    private UUID facultyId;

    /**
     * A faculty member can hold multiple roles simultaneously.
     * e.g., a MENTOR who is also a CLASS_COORDINATOR.
     * Stored as a native PostgreSQL text[] array via JSONB to keep flexibility.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "type", columnDefinition = "jsonb", nullable = false)
    private List<FacultyType> type;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "department", nullable = false)
    private Department department;
}
