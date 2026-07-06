package org.prathyushacampus.pectop.studentgeneralprofileservice.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.InitialStudentProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileResponse;
import org.prathyushacampus.pectop.studentgeneralprofileservice.mapper.StudentPublicProfileMapper;
import org.prathyushacampus.pectop.studentgeneralprofileservice.model.*;
import org.prathyushacampus.pectop.studentgeneralprofileservice.repository.StudentPublicProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentProfileServiceTest {

    @Mock
    private StudentPublicProfileRepository studentPublicProfileRepository;
    @Mock
    private StudentPublicProfileMapper studentPublicProfileMapper;
    @Mock
    private S3StorageService s3StorageService;

    @InjectMocks
    private StudentProfileService studentProfileService;

    private UUID studentId = UUID.fromString("43345805-947b-4361-a6ba-9be64b354580");
    private String admissionNumber = "ADM2021001";

    @Test
    void addNewStudentPublicProfile_WhenAdmissionNumberExists_ShouldThrowConflict() {
        InitialStudentProfileRequest request = InitialStudentProfileRequest.builder()
                .studentId(studentId)
                .admissionNumber(admissionNumber)
                .build();

        when(studentPublicProfileRepository.existsByAcademicDetails_AdmissionNumber(admissionNumber))
                .thenReturn(true);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
            studentProfileService.addNewStudentPublicProfile(request)
        );

        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
        assertTrue(ex.getReason().contains("already exists"));
    }

    @Test
    void modifyStudentPublicProfile_WhenAdmissionTakenByOther_ShouldThrowConflict() {
        // Arrange
        String conflictAdmission = "ADM-OTHER";

        StudentPublicProfile existingProfile = new StudentPublicProfile();
        existingProfile.setStudentId(studentId);
        when(studentPublicProfileRepository.findByStudentId(studentId)).thenReturn(Optional.of(existingProfile));

        // Another student already has this admission number
        when(studentPublicProfileRepository.existsByAcademicDetails_AdmissionNumberAndStudentIdNot(conflictAdmission, studentId))
                .thenReturn(true);

        StudentPublicProfileRequest request = StudentPublicProfileRequest.builder()
                .academicDetails(StudentAcademicDetails.builder()
                        .admissionNumber(conflictAdmission)
                        .build())
                .build();

        // Act & Assert
        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
            studentProfileService.modifyStudentPublicProfile(studentId, request)
        );

        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
        assertTrue(ex.getReason().contains("already taken by another student"));
    }

    @Test
    void modifyStudentPublicProfile_WhenRegisterTakenByOther_ShouldThrowConflict() {
        // Arrange
        String conflictRegister = "REG123";

        StudentPublicProfile existingProfile = new StudentPublicProfile();
        existingProfile.setStudentId(studentId);
        when(studentPublicProfileRepository.findByStudentId(studentId)).thenReturn(Optional.of(existingProfile));

        // Another student already has this register number
        when(studentPublicProfileRepository.existsByAcademicDetails_RegisterNumberAndStudentIdNot(conflictRegister, studentId))
                .thenReturn(true);

        StudentPublicProfileRequest request = StudentPublicProfileRequest.builder()
                .academicDetails(StudentAcademicDetails.builder()
                        .registerNumber(conflictRegister)
                        .build())
                .build();

        // Act & Assert
        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
            studentProfileService.modifyStudentPublicProfile(studentId, request)
        );

        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
        assertTrue(ex.getReason().contains("already taken by another student"));
    }

    @Test
    void modifyStudentPublicProfile_WhenSameStudentOwnsAdmission_ShouldSucceed() {
        // Arrange
        StudentPublicProfile existingProfile = new StudentPublicProfile();
        existingProfile.setStudentId(studentId);
        existingProfile.setAcademicDetails(new StudentAcademicDetails());

        when(studentPublicProfileRepository.findByStudentId(studentId)).thenReturn(Optional.of(existingProfile));
        // Same student owns it, so returns false
        when(studentPublicProfileRepository.existsByAcademicDetails_AdmissionNumberAndStudentIdNot(admissionNumber, studentId))
                .thenReturn(false);
        when(studentPublicProfileRepository.save(any())).thenReturn(existingProfile);
        when(studentPublicProfileMapper.mapToResponse(any())).thenReturn(new StudentPublicProfileResponse());

        StudentPublicProfileRequest request = StudentPublicProfileRequest.builder()
                .academicDetails(StudentAcademicDetails.builder()
                        .admissionNumber(admissionNumber)
                        .build())
                .build();

        // Act
        StudentPublicProfileResponse response = studentProfileService.modifyStudentPublicProfile(studentId, request);

        // Assert
        assertNotNull(response);
        verify(studentPublicProfileRepository).save(existingProfile);
    }

    @Test
    void modifyStudentPublicProfile_Success() {
        // Arrange
        StudentPublicProfile existingProfile = new StudentPublicProfile();
        existingProfile.setStudentId(studentId);
        existingProfile.setAcademicDetails(new StudentAcademicDetails());

        when(studentPublicProfileRepository.findByStudentId(studentId)).thenReturn(Optional.of(existingProfile));
        when(studentPublicProfileRepository.save(any())).thenReturn(existingProfile);
        when(studentPublicProfileMapper.mapToResponse(any())).thenReturn(new StudentPublicProfileResponse());

        StudentPublicProfileRequest request = StudentPublicProfileRequest.builder()
                .personalDetails(StudentPersonalDetails.builder().email("new@test.com").build())
                .build();

        // Act
        StudentPublicProfileResponse response = studentProfileService.modifyStudentPublicProfile(studentId, request);

        // Assert
        assertNotNull(response);
        verify(studentPublicProfileRepository).save(existingProfile);
    }
}
