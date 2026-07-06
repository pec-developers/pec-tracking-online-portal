package org.prathyushacampus.facultyservice.repository;

import org.prathyushacampus.facultyservice.model.MentorMenteeMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MentorMenteeMappingRepository extends JpaRepository<MentorMenteeMapping, UUID> {

    /**
     * Find all mentees assigned to a given mentor (faculty) for a specific semester and year.
     */
    List<MentorMenteeMapping> findByFacultyIdAndSemesterAndYear(UUID facultyId, int semester, int year);

    /**
     * Find the mentor mapping for a specific student in a given semester and year.
     */
    Optional<MentorMenteeMapping> findByStudentIdAndSemesterAndYear(UUID studentId, int semester, int year);

    /**
     * Check whether a mentor-student mapping already exists for a given semester/year.
     */
    boolean existsByFacultyIdAndStudentIdAndSemesterAndYear(UUID facultyId, UUID studentId, int semester, int year);
}
