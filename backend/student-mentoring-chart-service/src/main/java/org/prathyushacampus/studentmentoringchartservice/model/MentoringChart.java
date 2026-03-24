package org.prathyushacampus.studentmentoringchartservice.model;

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
    name = "mentoring_charts",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_student_semester_year",
        columnNames = {"student_id", "semester", "year"}
    )
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentoringChart {

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

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "time_management", columnDefinition = "jsonb")
    private TimeManagement timeManagement;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "class_routine", columnDefinition = "jsonb")
    private ClassRoutine classRoutine;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "examinations", columnDefinition = "jsonb")
    private Examinations examinations;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "other_activities", columnDefinition = "jsonb")
    private OtherActivities otherActivities;

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
