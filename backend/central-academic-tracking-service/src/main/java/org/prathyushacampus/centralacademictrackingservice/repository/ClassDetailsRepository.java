package org.prathyushacampus.centralacademictrackingservice.repository;

import org.prathyushacampus.centralacademictrackingservice.model.ClassDetails;
import org.prathyushacampus.centralacademictrackingservice.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClassDetailsRepository extends JpaRepository<ClassDetails, UUID> {

    /**
     * Find all classes in a given department.
     */
    List<ClassDetails> findByDepartment(Department department);

    /**
     * Find a class by its section name.
     */
    List<ClassDetails> findBySection(String section);
}
