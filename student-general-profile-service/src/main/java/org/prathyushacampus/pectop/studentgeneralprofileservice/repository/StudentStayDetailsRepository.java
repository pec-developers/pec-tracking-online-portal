package org.prathyushacampus.pectop.studentgeneralprofileservice.repository;

import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentStayDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentStayDetailsRepository extends JpaRepository<StudentStayDetails, Long> {
}
