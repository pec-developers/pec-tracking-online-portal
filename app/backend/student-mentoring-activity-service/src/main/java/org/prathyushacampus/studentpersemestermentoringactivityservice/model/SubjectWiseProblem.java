package org.prathyushacampus.studentpersemestermentoringactivityservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectWiseProblem {

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "problem_description", columnDefinition = "TEXT")
    private String problemDescription;
}
