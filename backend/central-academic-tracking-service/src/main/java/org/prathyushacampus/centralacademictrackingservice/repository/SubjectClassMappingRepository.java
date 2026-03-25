package org.prathyushacampus.centralacademictrackingservice.repository;

import org.prathyushacampus.centralacademictrackingservice.model.SubjectClassMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubjectClassMappingRepository extends JpaRepository<SubjectClassMapping, UUID> {

    /**
     * Find all subjects assigned to a given class for a specific semester and year.
     */
    List<SubjectClassMapping> findByClassIdAndSemesterAndYear(UUID classId, int semester, int year);
}
