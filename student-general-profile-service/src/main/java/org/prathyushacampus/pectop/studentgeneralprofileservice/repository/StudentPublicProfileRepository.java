package org.prathyushacampus.pectop.studentgeneralprofileservice.repository;

import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentPublicProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentPublicProfileRepository extends JpaRepository<StudentPublicProfile, Long> {
    Optional<StudentPublicProfile> findByStudentId(String studentId);
}
