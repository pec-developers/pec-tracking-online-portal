package org.prathyushacampus.pectop.studentgeneralprofileservice.repository;

import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentSibling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentSiblingRepository extends JpaRepository<StudentSibling, Long> {
}
