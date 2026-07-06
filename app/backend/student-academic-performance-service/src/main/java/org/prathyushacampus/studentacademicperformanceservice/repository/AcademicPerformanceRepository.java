package org.prathyushacampus.studentacademicperformanceservice.repository;

import org.prathyushacampus.studentacademicperformanceservice.model.AcademicPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AcademicPerformanceRepository extends JpaRepository<AcademicPerformance, UUID> {
    Optional<AcademicPerformance> findByStudentIdAndSemesterAndYear(UUID studentId, Integer semester, Integer year);
}
