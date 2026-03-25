package org.prathyushacampus.studentmentorreviewservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentoringScores {

    private Integer asPerson;
    private Integer studies;
    private Integer behaviour;
    private Integer characterAndContact;
    private Integer knowledge;
    private Integer total;

    @JsonProperty("student-signature")
    private Boolean studentSignature;
}
