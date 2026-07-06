package org.prathyushacampus.centralacademictrackingservice.repository;

import org.prathyushacampus.centralacademictrackingservice.model.SubjectFacultyMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubjectFacultyMappingRepository extends JpaRepository<SubjectFacultyMapping, UUID> {

    /**
     * Find all faculty-subject assignments for a given class in a semester/year.
     */
    List<SubjectFacultyMapping> findByClassIdAndSemesterAndYear(UUID classId, int semester, int year);

    /**
     * Find all subject assignments for a specific faculty in a semester/year.
     */
    List<SubjectFacultyMapping> findByFacultyIdAndSemesterAndYear(UUID facultyId, int semester, int year);
}
