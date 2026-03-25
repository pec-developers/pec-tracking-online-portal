package org.prathyushacampus.centralacademictrackingservice.repository;

import org.prathyushacampus.centralacademictrackingservice.model.ClassCoordinatorFacultyMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClassCoordinatorFacultyMappingRepository extends JpaRepository<ClassCoordinatorFacultyMapping, UUID> {

    /**
     * Find the coordinator(s) for a class in a given semester/year.
     */
    List<ClassCoordinatorFacultyMapping> findByClassIdAndSemesterAndYear(UUID classId, int semester, int year);

    /**
     * Find all class coordinations for a specific faculty in a semester/year.
     */
    List<ClassCoordinatorFacultyMapping> findByFacultyIdAndSemesterAndYear(UUID facultyId, int semester, int year);
}
