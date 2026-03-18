package org.prathyushacampus.pectop.studentgeneralprofileservice.controller.put;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.prathyushacampus.pectop.studentgeneralprofileservice.BaseIntegrationTest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileRequest;
import org.springframework.http.MediaType;
import java.util.UUID;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PutStudentProfileTest extends BaseIntegrationTest {

    private final UUID studentId = UUID.fromString("43345805-947b-4361-a6ba-9be64b354580");
    private final String admissionNumber = "ADM2021001";

    @BeforeEach
    void setup() throws Exception {
        performPost(studentId, admissionNumber);
    }

    @Test
    void testUpdateStudentProfile() throws Exception {
        // Test PUT with full sample request
        StudentPublicProfileRequest putRequest = createSamplePutRequest(admissionNumber);
        mockMvc.perform(put("/general-profile/" + studentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(putRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.academicDetails.registerNumber").value("11142301CS04169"))
                .andExpect(jsonPath("$.personalDetails.email").value("arjun.ramesh2021@pec.edu"));
    }

    @Test
    void testUpdateSpecificFields() throws Exception {
        // Prepare request with specific field updates
        StudentPublicProfileRequest partialRequest = StudentPublicProfileRequest.builder()
                .personalDetails(org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentPersonalDetails.builder()
                        .gender("Other")
                        .build())
                .miscDetails(org.prathyushacampus.pectop.studentgeneralprofileservice.model.StudentMiscDetails.builder()
                        .motherTongue("French")
                        .build())
                .build();

        mockMvc.perform(put("/general-profile/" + studentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(partialRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.personalDetails.gender").value("Other"))
                .andExpect(jsonPath("$.miscDetails.motherTongue").value("French"));
    }
}
