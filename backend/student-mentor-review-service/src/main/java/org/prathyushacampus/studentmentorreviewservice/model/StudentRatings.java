package org.prathyushacampus.studentmentorreviewservice.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentRatings {

    private String mentorName;
    private String department;
    private List<MentoringRating> mentoringRatings;
}
