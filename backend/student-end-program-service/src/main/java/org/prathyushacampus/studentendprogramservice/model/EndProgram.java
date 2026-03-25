package org.prathyushacampus.studentendprogramservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import org.prathyushacampus.studentendprogramservice.model.jsonb.MiniProject;
import org.prathyushacampus.studentendprogramservice.model.jsonb.Placement;
import org.prathyushacampus.studentendprogramservice.model.jsonb.SemesterWiseData;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "end_programs", uniqueConstraints = {
        @UniqueConstraint(name = "uk_end_program_student", columnNames = {"student_id"})
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EndProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "batch", nullable = false)
    private String batch;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "semester_wise_data", columnDefinition = "jsonb")
    private List<SemesterWiseData> semesterWiseData;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "mini_projects", columnDefinition = "jsonb")
    private List<MiniProject> miniProjects;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "placements", columnDefinition = "jsonb")
    private List<Placement> placements;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
