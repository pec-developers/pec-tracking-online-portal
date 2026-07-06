package org.prathyushacampus.centralacademictrackingservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "class_details")
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassDetails extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "class_id", updatable = false, nullable = false)
    private UUID classId;

    @Column(name = "section", nullable = false)
    private String section;

    @Column(name = "current_year", nullable = false)
    private int currentYear;

    @Column(name = "current_semester", nullable = false)
    private int currentSemester;

    @Enumerated(EnumType.STRING)
    @Column(name = "department", nullable = false)
    private Department department;
}
