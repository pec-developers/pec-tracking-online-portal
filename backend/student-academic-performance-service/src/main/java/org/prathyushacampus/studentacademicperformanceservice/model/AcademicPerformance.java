package org.prathyushacampus.studentacademicperformanceservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.prathyushacampus.studentacademicperformanceservice.model.jsonb.ArrearsTracking;
import org.prathyushacampus.studentacademicperformanceservice.model.jsonb.InternalExam;
import org.prathyushacampus.studentacademicperformanceservice.model.jsonb.UniversityExam;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
    name = "academic_performances",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"student_id", "semester", "year"})
    }
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class AcademicPerformance {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(nullable = false)
    private Integer semester;

    @Column(name = "\"year\"", nullable = false)
    private Integer year;

    @Column(name = "class_id", nullable = false)
    private UUID classId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "internal_exams", columnDefinition = "jsonb")
    private List<InternalExam> internalExams;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "university_exam", columnDefinition = "jsonb")
    private UniversityExam universityExam;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "arrears_tracking", columnDefinition = "jsonb")
    private ArrearsTracking arrearsTracking;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
