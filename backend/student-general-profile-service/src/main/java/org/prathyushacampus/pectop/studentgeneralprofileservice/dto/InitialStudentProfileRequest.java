package org.prathyushacampus.pectop.studentgeneralprofileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InitialStudentProfileRequest {
    private String studentId;
    private String name;
    private String admissionNumber;
}
