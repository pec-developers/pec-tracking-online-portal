package org.prathyushacampus.studentmentoringchartservice.repository;

import java.util.Optional;
import java.util.UUID;

import org.prathyushacampus.studentmentoringchartservice.model.MentoringChart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentoringChartRepository extends JpaRepository<MentoringChart, UUID> {

    Optional<MentoringChart> findByStudentIdAndSemesterAndYear(UUID studentId, int semester, int year);
}
