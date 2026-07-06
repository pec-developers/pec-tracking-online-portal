package org.prathyushacampus.centralacademictrackingservice.repository;

import org.prathyushacampus.centralacademictrackingservice.model.SubjectDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectDetailsRepository extends JpaRepository<SubjectDetails, String> {

    /**
     * Find all subjects offered in a given semester and year.
     */
    List<SubjectDetails> findBySemesterAndYear(int semester, int year);
}
