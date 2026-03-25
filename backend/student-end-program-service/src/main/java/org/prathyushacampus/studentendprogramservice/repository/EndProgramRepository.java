package org.prathyushacampus.studentendprogramservice.repository;

import org.prathyushacampus.studentendprogramservice.model.EndProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EndProgramRepository extends JpaRepository<EndProgram, UUID> {
    
    Optional<EndProgram> findByStudentId(UUID studentId);
}
