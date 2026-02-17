package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

@Entity
@Table(name = "student_personal_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentPersonalDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    private String gender;
    private String dateOfBirth;
    @Formula("EXTRACT(YEAR FROM AGE(CAST(date_of_birth AS DATE)))")
    @Basic(fetch = FetchType.EAGER)
    private Integer age;
    private String nationality;
    private String state;
    private String religion;
    private String caste;
    private String community;
    private String bloodGroup;
    private String phoneNumber;
    private String email;
}
