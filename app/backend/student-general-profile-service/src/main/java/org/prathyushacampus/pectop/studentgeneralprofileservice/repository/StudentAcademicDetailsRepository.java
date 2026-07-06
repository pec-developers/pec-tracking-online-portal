package org.prathyushacampus.pectop.studentgeneralprofileservice.repository;

import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentAcademicDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentAcademicDetailsRepository extends JpaRepository<StudentAcademicDetails, Long> {
    Optional<StudentAcademicDetails> findByRegisterNumber(String registerNumber);
    Optional<StudentAcademicDetails> findByAdmissionNumber(String admissionNumber);
}
