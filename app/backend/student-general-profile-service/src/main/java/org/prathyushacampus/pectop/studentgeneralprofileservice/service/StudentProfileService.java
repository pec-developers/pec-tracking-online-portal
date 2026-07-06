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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentPublicProfileRepository studentPublicProfileRepository;
    private final StudentPublicProfileMapper studentPublicProfileMapper;
    private final S3StorageService s3StorageService;

    public StudentPublicProfileResponse addNewStudentPublicProfile(InitialStudentProfileRequest request) {
        if (request.getAdmissionNumber() != null &&
                studentPublicProfileRepository.existsByAcademicDetails_AdmissionNumber(request.getAdmissionNumber())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Student with admission number " + request.getAdmissionNumber() + " already exists");
        }

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
    public StudentPublicProfileResponse getStudentPublicProfile(UUID studentId) {
        StudentPublicProfile studentPublicProfile = findProfileByStudentId(studentId);
        return studentPublicProfileMapper.mapToResponse(studentPublicProfile);
    }

    public StudentPublicProfileResponse modifyStudentPublicProfile(UUID studentId,
            StudentPublicProfileRequest request) {
        StudentPublicProfile studentPublicProfile = findProfileByStudentId(studentId);

        // Proactive validation for duplicate admission/register numbers
        if (request.getAcademicDetails() != null) {
            String newAdmission = request.getAcademicDetails().getAdmissionNumber();
            String newRegister = request.getAcademicDetails().getRegisterNumber();

            if (newAdmission != null) {
                if (studentPublicProfileRepository.existsByAcademicDetails_AdmissionNumberAndStudentIdNot(newAdmission, studentId)) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT,
                            "Admission number " + newAdmission + " is already taken by another student");
                }
            }

            if (newRegister != null) {
                if (studentPublicProfileRepository.existsByAcademicDetails_RegisterNumberAndStudentIdNot(newRegister, studentId)) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT,
                            "Register number " + newRegister + " is already taken by another student");
                }
            }
        }

        clearHostelFieldsIfNotHostel(studentPublicProfile, request);
        deepCopyNonNullProperties(request, studentPublicProfile);

        StudentPublicProfile savedProfile = studentPublicProfileRepository.save(studentPublicProfile);
        return studentPublicProfileMapper.mapToResponse(savedProfile);
    }

    public StudentPublicProfileResponse uploadFatherImage(UUID studentId, MultipartFile file) {
        StudentPublicProfile profile = findProfileByStudentId(studentId);

        String imageUrl = s3StorageService.uploadImage(studentId, "father", file);

        if (profile.getFamilyDetails() == null) {
            profile.setFamilyDetails(new StudentFamilyDetails());
        }
        if (profile.getFamilyDetails().getFather() == null) {
            profile.getFamilyDetails().setFather(new ParentDetails());
        }
        profile.getFamilyDetails().getFather().setImageUrl(imageUrl);

        StudentPublicProfile savedProfile = studentPublicProfileRepository.save(profile);
        return studentPublicProfileMapper.mapToResponse(savedProfile);
    }

    public StudentPublicProfileResponse uploadMotherImage(UUID studentId, MultipartFile file) {
        StudentPublicProfile profile = findProfileByStudentId(studentId);

        String imageUrl = s3StorageService.uploadImage(studentId, "mother", file);

        if (profile.getFamilyDetails() == null) {
            profile.setFamilyDetails(new StudentFamilyDetails());
        }
        if (profile.getFamilyDetails().getMother() == null) {
            profile.getFamilyDetails().setMother(new ParentDetails());
        }
        profile.getFamilyDetails().getMother().setImageUrl(imageUrl);

        StudentPublicProfile savedProfile = studentPublicProfileRepository.save(profile);
        return studentPublicProfileMapper.mapToResponse(savedProfile);
    }

    public StudentPublicProfileResponse uploadSelfImage(UUID studentId, MultipartFile file) {
        StudentPublicProfile profile = findProfileByStudentId(studentId);

        String imageUrl = s3StorageService.uploadImage(studentId, "self", file);

        if (profile.getAcademicDetails() == null) {
            profile.setAcademicDetails(new StudentAcademicDetails());
        }
        profile.getAcademicDetails().setImageUrl(imageUrl);

        StudentPublicProfile savedProfile = studentPublicProfileRepository.save(profile);
        return studentPublicProfileMapper.mapToResponse(savedProfile);
    }

    private StudentPublicProfile findProfileByStudentId(UUID studentId) {
        return studentPublicProfileRepository.findByStudentId(studentId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student Public Profile not found"));
    }

    @SuppressWarnings("unchecked")
    private void deepCopyNonNullProperties(Object source, Object target) {
        if (source == null || target == null)
            return;

        BeanWrapper srcWrap = new BeanWrapperImpl(source);
        BeanWrapper trgWrap = new BeanWrapperImpl(target);

        for (java.beans.PropertyDescriptor pd : srcWrap.getPropertyDescriptors()) {
            String propertyName = pd.getName();
            if ("class".equals(propertyName) || "id".equals(propertyName))
                continue;

            Object srcValue = srcWrap.getPropertyValue(propertyName);
            if (srcValue == null)
                continue;

            if (trgWrap.isWritableProperty(propertyName)) {
                Object trgValue = trgWrap.getPropertyValue(propertyName);

                if (srcValue instanceof java.util.List<?> srcList) {
                    // IMPORTANT: Never replace a Hibernate-managed collection reference.
                    // Doing so detaches the PersistentBag and causes the
                    // "collection with orphan deletion was no longer referenced" exception.
                    // Instead, clear the existing managed collection and refill it.
                    if (trgValue instanceof java.util.List<?> trgList) {
                        ((java.util.List<Object>) trgList).clear();
                        ((java.util.List<Object>) trgList).addAll((java.util.List<Object>) srcList);
                    } else {
                        trgWrap.setPropertyValue(propertyName, srcValue);
                    }
                } else if (trgValue != null && (isModelClass(srcValue.getClass()) || isEmbeddable(srcValue.getClass()))) {
                    // Recursively merge nested model/embeddable objects
                    deepCopyNonNullProperties(srcValue, trgValue);
                } else {
                    trgWrap.setPropertyValue(propertyName, srcValue);
                }
            }
        }
    }

    private boolean isModelClass(Class<?> clazz) {
        return clazz.getName().startsWith("org.prathyushacampus.pectop.studentgeneralprofileservice.model")
                && !clazz.isEnum();
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
