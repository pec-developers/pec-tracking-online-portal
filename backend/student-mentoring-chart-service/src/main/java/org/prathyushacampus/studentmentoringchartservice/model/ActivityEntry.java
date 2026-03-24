package org.prathyushacampus.studentmentoringchartservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityEntry {

    private float time;
    private String mentorSuggestion;
}
