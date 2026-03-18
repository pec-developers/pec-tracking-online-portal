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
public class SpecialNeed {

    @Column(columnDefinition = "TEXT")
    private String coaching;

    @Column(columnDefinition = "TEXT")
    private String attention;

    @Column(name = "existing_distraction", columnDefinition = "TEXT")
    private String existingDistraction;
}
