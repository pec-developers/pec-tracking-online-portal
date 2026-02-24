package org.prathyushacampus.pectop.studentgeneralprofileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.prathyushacampus.pectop.studentgeneralprofileservice.model.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentPublicProfileRequest {
    private StudentAcademicDetails academicDetails;
    private StudentPersonalDetails personalDetails;
    private StudentFamilyDetails familyDetails;
    private StudentAddressDetails addressDetails;
    private StudentAcademicHistory academicHistory;
    private StudentMiscDetails miscDetails;
    private StudentSocioEconomicDetails socioEconomicDetails;
    private StudentAmbitionDetails ambitionDetails;
}
