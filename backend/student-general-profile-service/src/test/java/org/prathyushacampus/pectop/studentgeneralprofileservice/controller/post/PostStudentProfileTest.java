package org.prathyushacampus.pectop.studentgeneralprofileservice.controller.post;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.prathyushacampus.pectop.studentgeneralprofileservice.BaseIntegrationTest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.InitialStudentProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentPublicProfile;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PostStudentProfileTest extends BaseIntegrationTest {

    @Test
    void testCreateStudentProfile() throws Exception {
        String studentId = "43345805-947b-4361-a6ba-9be64b354580";
        String admissionNumber = "ADM2021001";

        InitialStudentProfileRequest postRequest = getInitialRequest(studentId, admissionNumber);
        
        mockMvc.perform(post("/general-profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(postRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.studentId").value(studentId))
                .andExpect(jsonPath("$.academicDetails.name").value("Arjun Ramesh Kumar"));

        Assertions.assertEquals(1, studentPublicProfileRepository.findAll().size());
        StudentPublicProfile savedProfile = studentPublicProfileRepository.findAll().get(0);
        Assertions.assertEquals(studentId, savedProfile.getStudentId());
    }
}
