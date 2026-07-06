package org.prathyushacampus.studentendprogramservice.model.jsonb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Placement {

    @JsonProperty("year")
    private Integer year;

    @JsonProperty("semester")
    private Integer semester;

    @JsonProperty("date")
    private LocalDate date;

    @JsonProperty("venue")
    private String venue;

    @JsonProperty("company_detail")
    private String companyDetail;

    @JsonProperty("outcome")
    private String outcome;
}
