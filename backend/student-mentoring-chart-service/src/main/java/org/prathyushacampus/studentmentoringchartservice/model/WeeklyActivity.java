package org.prathyushacampus.studentmentoringchartservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyActivity {

    private ActivityEntry academic;
    private ActivityEntry professionalTraining;
    private ActivityEntry knowledgeUpdating;
    private ActivityEntry recreations;
    private ActivityEntry personalAttention;
}
