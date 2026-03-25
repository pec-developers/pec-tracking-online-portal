package org.prathyushacampus.studentendprogramservice.model.jsonb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Scholarship {

    @JsonProperty("type")
    private String type; // INTERNAL | EXTERNAL

    @JsonProperty("name")
    private String name;

    @JsonProperty("amount")
    private BigDecimal amount;

    @JsonProperty("date_received")
    private LocalDate dateReceived;
}
