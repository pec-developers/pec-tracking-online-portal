package org.prathyushacampus.studentendprogramservice.model.jsonb;

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
public class SemesterWiseData {

    @JsonProperty("year")
    private Integer year;

    @JsonProperty("semester")
    private Integer semester;

    @JsonProperty("cgpa")
    private Float cgpa;

    @JsonProperty("fees_receipt")
    private List<FeesReceipt> feesReceipts;

    @JsonProperty("attendance_percentage")
    private Float attendancePercentage;

    @JsonProperty("detention")
    private Detention detention;

    @JsonProperty("sem_drop")
    private SemDrop semDrop;

    @JsonProperty("scholarship")
    private List<Scholarship> scholarships;
}
