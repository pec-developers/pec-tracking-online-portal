package org.prathyushacampus.studentmentorreviewservice.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "student_mentor_reviews",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_student_semester_year_mentor",
        columnNames = {"student_id", "semester", "year", "mentor_id"}
    )
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentMentorReview {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(nullable = false)
    private int semester;

    @Column(nullable = false)
    private int year;

    @Column(name = "class_id", nullable = false)
    private UUID classId;

    @Column(name = "mentor_id", nullable = false)
    private UUID mentorId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "student_ratings", columnDefinition = "jsonb")
    private StudentRatings studentRatings;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "mentor_observation", columnDefinition = "jsonb")
    private MentorObservation mentorObservation;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "analysis_sheet", columnDefinition = "jsonb")
    private AnalysisSheet analysisSheet;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
