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
public class SelfDevelopment {

    @ElementCollection
    @CollectionTable(name = "mentoring_self_development_dailies", joinColumns = @JoinColumn(name = "mentoring_activity_id"))
    @Column(name = "daily")
    private List<String> dailiesList;

    @Column(name = "self_update_review", columnDefinition = "TEXT")
    private String selfUpdateReview;

    @Column(name = "communication_effort", columnDefinition = "TEXT")
    private String communicationEffort;

    @Column(name = "improvement_review", columnDefinition = "TEXT")
    private String improvementReview;
}
