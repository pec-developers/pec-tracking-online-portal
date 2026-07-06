package org.prathyushacampus.studentmentoringchartservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomActivity {

    private String subjectCode;
    private int attendance;
    private int attentiveness;
    private int takingNotes;
    private int interaction;
    private int taskCompletion;
}
