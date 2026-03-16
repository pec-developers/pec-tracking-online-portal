package org.prathyushacampus.pectop.studentgeneralprofileservice.controller.get;

import org.junit.jupiter.api.Test;
import org.prathyushacampus.pectop.studentgeneralprofileservice.BaseIntegrationTest;

import static org.hamcrest.Matchers.hasItems;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GetStudentProfileTest extends BaseIntegrationTest {

    private final String studentId = "43345805-947b-4361-a6ba-9be64b354580";
    private final String admissionNumber = "ADM2021001";

    @Test
    void testGetInitialProfile() throws Exception {
        // Step 1: Create initial profile
        performPost(studentId, admissionNumber);

        // Step 2: Verify only basic fields are populated
        mockMvc.perform(get("/general-profile/" + studentId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentId").value(studentId))
                .andExpect(jsonPath("$.academicDetails.name").value("Arjun Ramesh Kumar"))
                .andExpect(jsonPath("$.academicDetails.admissionNumber").value(admissionNumber))
                .andExpect(jsonPath("$.academicDetails.registerNumber").isEmpty())
                .andExpect(jsonPath("$.personalDetails").isEmpty())
                .andExpect(jsonPath("$.familyDetails").isEmpty())
                .andExpect(jsonPath("$.addressDetails").isEmpty());
    }

    @Test
    void testGetFullProfileAfterUpdate() throws Exception {
        // Step 1: Create initial profile
        performPost(studentId, admissionNumber);

        // Step 2: Perform full update
        performPut(studentId, admissionNumber);

        // Step 3: Verify ALL fields are correctly retrieved
        mockMvc.perform(get("/general-profile/" + studentId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentId").value(studentId))
                // Academic
                .andExpect(jsonPath("$.academicDetails.registerNumber").value("11142301CS04169"))
                .andExpect(jsonPath("$.academicDetails.branch").value("Computer Science and Engineering"))
                // Personal
                .andExpect(jsonPath("$.personalDetails.gender").value("Male"))
                .andExpect(jsonPath("$.personalDetails.email").value("arjun.ramesh2021@pec.edu"))
                // Family
                .andExpect(jsonPath("$.familyDetails.father.name").value("Ramesh Kumar"))
                .andExpect(jsonPath("$.familyDetails.mother.name").value("Meena Ramesh"))
                // Address
                .andExpect(jsonPath("$.addressDetails.studentPresentStayType").value("OWN_ACCOMMODATION_FRIENDS"))
                // Misc
                .andExpect(jsonPath("$.miscDetails.motherTongue").value("Tamil"))
                // Ambition
                .andExpect(jsonPath("$.ambitionDetails.careerPlan.careerChoices").value(hasItems("JOB", "HIGHER_STUDIES")));
    }
}
