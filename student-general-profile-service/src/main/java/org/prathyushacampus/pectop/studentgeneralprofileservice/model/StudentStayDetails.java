package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "student_stay_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentStayDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private Integer academicYear;

    @Enumerated(EnumType.STRING)
    private StayType stayType;

    private String address;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "stay_details_id")
    private List<FellowMate> fellowMates;
}
