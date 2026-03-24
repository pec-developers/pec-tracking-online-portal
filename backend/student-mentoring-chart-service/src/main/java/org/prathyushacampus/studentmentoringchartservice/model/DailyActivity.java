package org.prathyushacampus.studentmentoringchartservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyActivity {

    private ActivityEntry readingForSubject;
    private ActivityEntry lightReading;
    private ActivityEntry otherPreparations;
    private ActivityEntry browsing;
    private ActivityEntry onSocialNetworks;
    private ActivityEntry physicalSports;
}
