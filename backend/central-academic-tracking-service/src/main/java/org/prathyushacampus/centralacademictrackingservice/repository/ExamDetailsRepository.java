package org.prathyushacampus.centralacademictrackingservice.repository;

import org.prathyushacampus.centralacademictrackingservice.model.ExamDetails;
import org.prathyushacampus.centralacademictrackingservice.model.SemesterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExamDetailsRepository extends JpaRepository<ExamDetails, UUID> {

    /**
     * Find the exam definition for a given year and semester type.
     */
    Optional<ExamDetails> findByYearAndSemesterType(int year, SemesterType semesterType);
}
