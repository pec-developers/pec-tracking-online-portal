package org.prathyushacampus.studentpersemestermentoringactivityservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Library {

    @Enumerated(EnumType.STRING)
    @Column(name = "library_frequency")
    private LibraryFrequency frequency;

    @Embedded
    private Borrow borrow;
}
