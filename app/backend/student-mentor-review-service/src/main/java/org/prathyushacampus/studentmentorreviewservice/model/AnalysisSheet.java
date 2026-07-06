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
public class AnalysisSheet {

    private String strength;
    private String weakness;
    private Improvements improvements;

    @JsonProperty("mentor-signature")
    private Boolean mentorSignature;

    @JsonProperty("class-coordinator-signature")
    private Boolean classCoordinatorSignature;

    @JsonProperty("hod-signature")
    private Boolean hodSignature;

    @JsonProperty("principal-signature")
    private Boolean principalSignature;
}
