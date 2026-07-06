package org.prathyushacampus.facultyservice.repository;

import org.prathyushacampus.facultyservice.model.FacultyDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FacultyRepository extends JpaRepository<FacultyDetails, UUID> {

    Optional<FacultyDetails> findByName(String name);
}
