package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_academic_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    private String name;
    @Column(unique = true)
    private String registerNumber;
    @Column(unique = true)
    private String admissionNumber;
    private Integer batchStart;
    private Integer batchEnd;
    private String branch;
    private String section;
}
