package org.prathyushacampus.studentmentorreviewservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisSheet {

    private String strength;
    private String weakness;
    private Improvements improvements;
}
