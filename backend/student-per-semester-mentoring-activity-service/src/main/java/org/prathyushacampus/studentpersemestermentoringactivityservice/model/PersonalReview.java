package org.prathyushacampus.studentpersemestermentoringactivityservice.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonalReview {

    @ElementCollection
    @CollectionTable(name = "mentoring_field_of_interest", joinColumns = @JoinColumn(name = "mentoring_activity_id"))
    @Column(name = "interest")
    private List<String> fieldOfInterest;

    @Column(columnDefinition = "TEXT")
    private String favouriteTeacher;

    @Column(columnDefinition = "TEXT")
    private String favouriteSubject;

    @Column(columnDefinition = "TEXT")
    private String easiestSubject;

    @Column(columnDefinition = "TEXT")
    private String hardestSubject;
}
