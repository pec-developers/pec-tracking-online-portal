package org.prathyushacampus.studentmentorreviewservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Improvements {

    private String attendance;
    private String discipline;
    private String studies;
    private String coExtraCurricularActivity;
}
