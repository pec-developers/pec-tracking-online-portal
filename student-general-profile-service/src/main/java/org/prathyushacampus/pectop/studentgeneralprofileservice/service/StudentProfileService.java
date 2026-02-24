package org.prathyushacampus.pectop.studentgeneralprofileservice.service;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.InitialStudentProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileResponse;
import org.prathyushacampus.pectop.studentgeneralprofileservice.mapper.StudentPublicProfileMapper;
import org.prathyushacampus.pectop.studentgeneralprofileservice.model.*;
import org.prathyushacampus.pectop.studentgeneralprofileservice.repository.StudentPublicProfileRepository;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentPublicProfileRepository studentPublicProfileRepository;
    private final StudentPublicProfileMapper studentPublicProfileMapper;

    public StudentPublicProfileResponse addNewStudentPublicProfile(InitialStudentProfileRequest request) {
        StudentAcademicDetails academicDetails = StudentAcademicDetails.builder()
                .name(request.getName())
                .admissionNumber(request.getAdmissionNumber())
                .build();

        StudentPublicProfile studentPublicProfile = StudentPublicProfile.builder()
                .studentId(request.getStudentId())
                .academicDetails(academicDetails)
                .build();

        StudentPublicProfile savedProfile = studentPublicProfileRepository.save(studentPublicProfile);

        return studentPublicProfileMapper.mapToResponse(savedProfile);
    }

    @Transactional(readOnly = true)
    public StudentPublicProfileResponse getStudentPublicProfile(String studentId) {
        StudentPublicProfile studentPublicProfile = studentPublicProfileRepository.findByStudentId(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student Public Profile not found"));

        return studentPublicProfileMapper.mapToResponse(studentPublicProfile);
    }

    public StudentPublicProfileResponse modifyStudentPublicProfile(String studentId, StudentPublicProfileRequest request) {
        StudentPublicProfile studentPublicProfile = studentPublicProfileRepository.findByStudentId(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student Public Profile not found"));

        clearHostelFieldsIfNotHostel(studentPublicProfile, request);
        deepCopyNonNullProperties(request, studentPublicProfile);

        StudentPublicProfile savedProfile = studentPublicProfileRepository.save(studentPublicProfile);
        return studentPublicProfileMapper.mapToResponse(savedProfile);
    }

    private void deepCopyNonNullProperties(Object source, Object target) {
        if (source == null || target == null) return;

        BeanWrapper srcWrap = new BeanWrapperImpl(source);
        BeanWrapper trgWrap = new BeanWrapperImpl(target);

        for (java.beans.PropertyDescriptor pd : srcWrap.getPropertyDescriptors()) {
            String propertyName = pd.getName();
            if ("class".equals(propertyName) || "id".equals(propertyName)) continue;

            Object srcValue = srcWrap.getPropertyValue(propertyName);
            if (srcValue == null) continue;

            if (trgWrap.isWritableProperty(propertyName)) {
                Object trgValue = trgWrap.getPropertyValue(propertyName);

                // Check if the property is a nested model class or an embeddable class
                if (trgValue != null && (isModelClass(srcValue.getClass()) || isEmbeddable(srcValue.getClass()))) {
                    deepCopyNonNullProperties(srcValue, trgValue);
                } else {
                    trgWrap.setPropertyValue(propertyName, srcValue);
                }
            }
        }
    }

    private boolean isModelClass(Class<?> clazz) {
        return clazz.getName().startsWith("org.prathyushacampus.pectop.studentgeneralprofileservice.model") && !clazz.isEnum();
    }

    private boolean isEmbeddable(Class<?> clazz) {
        return clazz.isAnnotationPresent(jakarta.persistence.Embeddable.class);
    }

    private void clearHostelFieldsIfNotHostel(StudentPublicProfile profile, StudentPublicProfileRequest request) {
        if (request.getAmbitionDetails() == null || request.getAmbitionDetails().getLivingStyle() == null) {
            return;
        }

        LivingStyle incomingLivingStyle = request.getAmbitionDetails().getLivingStyle();

        // Determine current stay type from either the incoming request or the existing
        // profile
        StayType currentStayType = null;
        if (request.getAddressDetails() != null) {
            currentStayType = request.getAddressDetails().getStudentPresentStayType();
        }
        if (currentStayType == null && profile.getAddressDetails() != null) {
            currentStayType = profile.getAddressDetails().getStudentPresentStayType();
        }

        if (currentStayType != StayType.HOSTEL) {
            incomingLivingStyle.setRoommatesDescription(null);
            incomingLivingStyle.setHostelEnvironmentDescription(null);
        }
    }
}
