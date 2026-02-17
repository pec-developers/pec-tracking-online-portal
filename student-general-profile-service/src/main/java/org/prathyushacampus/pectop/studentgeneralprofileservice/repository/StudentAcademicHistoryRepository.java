package org.prathyushacampus.pectop.studentgeneralprofileservice.repository;

import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentAcademicHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentAcademicHistoryRepository extends JpaRepository<StudentAcademicHistory, Long> {
}
