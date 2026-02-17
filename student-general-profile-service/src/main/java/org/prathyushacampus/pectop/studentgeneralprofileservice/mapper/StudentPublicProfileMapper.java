package org.prathyushacampus.pectop.studentgeneralprofileservice.mapper;

import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileResponse;
import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentPublicProfile;
import org.springframework.stereotype.Component;

@Component
public class StudentPublicProfileMapper {

    public StudentPublicProfileResponse mapToResponse(StudentPublicProfile studentPublicProfile) {
        if (studentPublicProfile == null) {
            return null;
        }

        return StudentPublicProfileResponse.builder()
                .studentId(studentPublicProfile.getStudentId())
                .academicDetails(studentPublicProfile.getAcademicDetails())
                .personalDetails(studentPublicProfile.getPersonalDetails())
                .familyDetails(studentPublicProfile.getFamilyDetails())
                .addressDetails(studentPublicProfile.getAddressDetails())
                .academicHistory(studentPublicProfile.getAcademicHistory())
                .miscDetails(studentPublicProfile.getMiscDetails())
                .socioEconomicDetails(studentPublicProfile.getSocioEconomicDetails())
                .ambitionDetails(studentPublicProfile.getAmbitionDetails())
                .build();
    }
}