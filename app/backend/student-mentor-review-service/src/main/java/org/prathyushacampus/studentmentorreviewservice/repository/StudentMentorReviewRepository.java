package org.prathyushacampus.studentmentorreviewservice.repository;

import java.util.Optional;
import java.util.UUID;

import org.prathyushacampus.studentmentorreviewservice.model.StudentMentorReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentMentorReviewRepository extends JpaRepository<StudentMentorReview, UUID> {

    Optional<StudentMentorReview> findByStudentIdAndSemesterAndYearAndMentorId(
            UUID studentId, int semester, int year, UUID mentorId);
}
