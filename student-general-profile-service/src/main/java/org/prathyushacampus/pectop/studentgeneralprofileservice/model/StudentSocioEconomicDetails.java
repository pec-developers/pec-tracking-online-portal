package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "student_socio_economic_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentSocioEconomicDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(name = "father_annual_income")
    @Positive(message = "Father's annual income must be greater than 0")
    private BigDecimal fatherAnnualIncome;

    @Column(name = "mother_annual_income")
    @Positive(message = "Mother's annual income must be greater than 0")
    private BigDecimal motherAnnualIncome;

    @Column(name = "other_income_source", columnDefinition = "TEXT")
    private String otherIncomeSource;

    @Column(name = "part_time_job", columnDefinition = "TEXT")
    private String partTimeJob;

    @Column(name = "scholarship", columnDefinition = "TEXT")
    private String scholarship;

    @Column(name = "other_financial_assistance", columnDefinition = "TEXT")
    private String otherFinancialAssistance;

}
