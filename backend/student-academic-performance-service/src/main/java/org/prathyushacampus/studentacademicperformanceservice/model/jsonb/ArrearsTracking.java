package org.prathyushacampus.studentacademicperformanceservice.model.jsonb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArrearsTracking {
    @JsonProperty("no-of-arrears")
    private Integer noOfArrears;

    @JsonProperty("subsequent-attemps")
    private List<String> subsequentAttempts;

    @JsonProperty("final-clearance")
    private Integer finalClearance;

    @JsonProperty("total-no-arrears")
    private Integer totalNoArrears;
}
