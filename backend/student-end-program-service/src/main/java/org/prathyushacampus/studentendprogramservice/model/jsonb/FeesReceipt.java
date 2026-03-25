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
public class FeesReceipt {

    @JsonProperty("receipt_number")
    private String receiptNumber;

    @JsonProperty("payment_date")
    private LocalDate paymentDate;

    @JsonProperty("amount")
    private Float amount;
}
