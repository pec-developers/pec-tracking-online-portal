package org.prathyushacampus.pectop.studentgeneralprofileservice.repository;

import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentPublicProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentPublicProfileRepository extends JpaRepository<StudentPublicProfile, Long> {
    Optional<StudentPublicProfile> findByStudentId(UUID studentId);

    boolean existsByAcademicDetails_AdmissionNumber(String admissionNumber);

    boolean existsByAcademicDetails_AdmissionNumberAndStudentIdNot(String admissionNumber, UUID studentId);

    boolean existsByAcademicDetails_RegisterNumberAndStudentIdNot(String registerNumber, UUID studentId);
}
