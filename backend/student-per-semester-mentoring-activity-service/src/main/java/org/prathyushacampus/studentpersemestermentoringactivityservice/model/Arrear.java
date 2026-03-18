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
public class Arrear {

    @Column(name = "subject_code")
    private String subjectCode;

    @Column(columnDefinition = "TEXT")
    private String reason;
}
