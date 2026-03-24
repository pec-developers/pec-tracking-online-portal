package org.prathyushacampus.studentmentoringchartservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OtherActivities {

    private OtherActivityEntry miniProject;
    private OtherActivityEntry presentations;
    private OtherActivityEntry participationsCulturalSports;
    private OtherActivityEntry trainingProgrammeAttended;
    private OtherActivityEntry anyOtherInterestedActivity;
}
