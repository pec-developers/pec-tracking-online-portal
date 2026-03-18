package org.prathyushacampus.pectop.studentgeneralprofileservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.InitialStudentProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.model.*;
import org.prathyushacampus.pectop.studentgeneralprofileservice.repository.StudentPublicProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.postgresql.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.TimeZone;
import java.util.UUID;



@Transactional
@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
public abstract class BaseIntegrationTest {

    static {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));
    }

    @Autowired
    protected StudentPublicProfileRepository studentPublicProfileRepository;

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Container
    protected static PostgreSQLContainer postgreSQLContainer = new PostgreSQLContainer("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test")
            .withEnv("TZ", "Asia/Kolkata");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgreSQLContainer::getJdbcUrl);
        registry.add("spring.datasource.username", postgreSQLContainer::getUsername);
        registry.add("spring.datasource.password", postgreSQLContainer::getPassword);
        registry.add("spring.jpa.properties.hibernate.jdbc.time_zone", () -> "Asia/Kolkata");
    }

    protected InitialStudentProfileRequest getInitialRequest(UUID studentId, String admissionNumber) {
        return InitialStudentProfileRequest.builder()
                .studentId(studentId)
                .name("Arjun Ramesh Kumar")
                .admissionNumber(admissionNumber)
                .build();
    }

    protected void performPost(UUID studentId, String admissionNumber) throws Exception {
        InitialStudentProfileRequest postRequest = getInitialRequest(studentId, admissionNumber);
        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/general-profile")
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(postRequest)))
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isCreated());
    }

    protected void performPut(UUID studentId, String admissionNumber) throws Exception {
        StudentPublicProfileRequest putRequest = createSamplePutRequest(admissionNumber);
        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put("/general-profile/" + studentId)
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(putRequest)))
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isOk());
    }

    protected StudentPublicProfileRequest createSamplePutRequest(String admissionNumber) {
        return StudentPublicProfileRequest.builder()
                .academicDetails(StudentAcademicDetails.builder()
                        .name("Arjun Ramesh Kumar")
                        .registerNumber("11142301CS04169")
                        .admissionNumber(admissionNumber)
                        .batchStart(2021)
                        .batchEnd(2025)
                        .branch("Computer Science and Engineering")
                        .section("A")
                        .build())
                .personalDetails(StudentPersonalDetails.builder()
                        .gender("Male")
                        .dateOfBirth("2003-07-15")
                        .nationality("Indian")
                        .state("Tamil Nadu")
                        .religion("Hindu")
                        .caste("Mudaliar")
                        .community("BC")
                        .bloodGroup("O+")
                        .phoneNumber("9876501234")
                        .email("arjun.ramesh2021@pec.edu")
                        .build())
                .familyDetails(StudentFamilyDetails.builder()
                        .father(ParentDetails.builder()
                                .name("Ramesh Kumar")
                                .education("B.E. Mechanical Engineering")
                                .occupation("Senior Engineer")
                                .contactNumber("9876543210")
                                .build())
                        .mother(ParentDetails.builder()
                                .name("Meena Ramesh")
                                .education("B.Sc. Mathematics")
                                .occupation("School Teacher")
                                .contactNumber("9876543211")
                                .build())
                        .siblings(List.of(
                                StudentSibling.builder()
                                        .name("Arun Kumar")
                                        .age(15)
                                        .sex("Male")
                                        .eduOrProfession("High School Student")
                                        .build(),
                                StudentSibling.builder()
                                        .name("Priya Kumar")
                                        .age(20)
                                        .sex("Female")
                                        .eduOrProfession("College Student")
                                        .build()
                        ))
                        .localGuardian(LocalGuardian.builder()
                                .name("Suresh Mudaliar")
                                .contactNumber("9876543212")
                                .address("12, Gandhi Nagar, Pondicherry - 605001")
                                .build())
                        .build())
                .addressDetails(StudentAddressDetails.builder()
                        .parentCommunicationAddress("45, Anna Street, Villupuram, Tamil Nadu - 605602")
                        .studentPermanentAddress("45, Anna Street, Villupuram, Tamil Nadu - 605602")
                        .stayDetails(List.of(
                                StudentStayDetails.builder()
                                        .academicYear(1)
                                        .stayType(StayType.HOSTEL)
                                        .address("Room 101, College Hostel")
                                        .fellowMates(List.of(
                                                FellowMate.builder()
                                                        .name("Karthik Selvam")
                                                        .age(20)
                                                        .gender("Male")
                                                        .contactNumber("9123456780")
                                                        .build(),
                                                FellowMate.builder()
                                                        .name("Vijay Anand")
                                                        .age(22)
                                                        .gender("Male")
                                                        .contactNumber("9123456781")
                                                        .build()
                                        ))
                                        .build(),
                                StudentStayDetails.builder()
                                        .academicYear(2)
                                        .stayType(StayType.OWN_ACCOMMODATION_FRIENDS)
                                        .address("Flat 5B, Sunshine Apartments")
                                        .fellowMates(List.of(
                                                FellowMate.builder()
                                                        .name("Deepa Krishnan")
                                                        .age(21)
                                                        .gender("Female")
                                                        .contactNumber("9123456782")
                                                        .build()
                                        ))
                                        .build()
                        ))
                        .build())
                .academicHistory(StudentAcademicHistory.builder()
                        .isLateralEntry(false)
                        .hscDetails(SchoolingDetails.builder()
                                .schoolName("ABC Higher Secondary School")
                                .board("State Board")
                                .medium("English")
                                .scoredMark(1100)
                                .totalMark(1200)
                                .build())
                        .sslcInterDetails(SslcInterDetails.builder()
                                .schoolName("XYZ Matriculation School")
                                .board("State Board")
                                .medium("English")
                                .mathMark(98)
                                .phyMark(95)
                                .chemMark(92)
                                .csBioMark(96)
                                .build())
                        .build())
                .miscDetails(StudentMiscDetails.builder()
                        .motherTongue("Tamil")
                        .otherKnownLanguages(List.of("English", "Hindi"))
                        .modeOfAdmission(StudentMiscDetails.ModeOfAdmission.COUNSELING)
                        .dietaryPreference(StudentMiscDetails.DietaryPreference.VEG)
                        .visionProblem(false)
                        .chronicIllness("None")
                        .build())
                .socioEconomicDetails(StudentSocioEconomicDetails.builder()
                        .fatherAnnualIncome(new BigDecimal("1200000.0"))
                        .motherAnnualIncome(new BigDecimal("600000.0"))
                        .otherIncomeSource("None")
                        .partTimeJob("None")
                        .scholarship("Merit Scholarship")
                        .otherFinancialAssistance("None")
                        .build())
                .ambitionDetails(StudentAmbitionDetails.builder()
                        .personalAmbition(PersonalAmbition.builder()
                                .longTermGoals("To become a successful software architect at a leading tech company")
                                .longTermGoalPlan("Complete B.E. with distinction, pursue M.Tech in AI/ML, and gain industry experience through internships")
                                .build())
                        .careerPlan(CareerPlan.builder()
                                .careerChoices(Set.of(CareerPlan.CareerChoice.JOB, CareerPlan.CareerChoice.HIGHER_STUDIES))
                                .careerPrepPlan("I plan to take online courses and build a portfolio.")
                                .extraCoachingDetails("Attending weekend workshops for advanced Java.")
                                .helpNeeded("Guidance on resume building.")
                                .build())
                        .selfAnalysis(SelfAnalysis.builder()
                                .academicStrength("Quick learner with strong analytical skills")
                                .generalStrength("Public speaking and team collaboration")
                                .academicWeakness("Tendency to spend too much time perfecting solutions")
                                .generalWeakness("Sometimes overthink decisions under pressure")
                                .build())
                        .livingStyle(LivingStyle.builder()
                                .yourCommunicationToParent(LivingStyle.CommunicationFrequency.WEEKLY)
                                .parentCommunicationToYou(LivingStyle.CommunicationFrequency.DAILY)
                                .weekendPlans("Visit library, play cricket with friends, and work on personal coding projects")
                                .roommatesDescription("Friendly and studious roommates who maintain a good study environment")
                                .hostelEnvironmentDescription("Clean and well-maintained hostel with good facilities and cooperative wardens")
                                .build())
                        .generalAcademicDetails(GeneralAcademicCocurricularDetails.builder()
                                .branchFeedback("Data Structures and Algorithms are the most interesting subjects")
                                .fundamentalMathStrength(GeneralAcademicCocurricularDetails.StrengthLevel.STRONG)
                                .fundamentalEnggStrength(GeneralAcademicCocurricularDetails.StrengthLevel.AVERAGE)
                                .questioningCapability(true)
                                .sportsInvolvement("Cricket - College team member")
                                .awardRecognitions("Best Outgoing Student - Class 12, Hackathon Runner-up 2022")
                                .build())
                        .build())
                .build();
    }
}
