package org.prathyushacampus.studentmentorreviewservice.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentoringRating {

    private LocalDate date;
    private MentoringScores scores;
}
