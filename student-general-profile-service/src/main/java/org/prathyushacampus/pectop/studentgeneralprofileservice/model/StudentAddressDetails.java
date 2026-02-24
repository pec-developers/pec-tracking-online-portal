package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "student_address_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentAddressDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private String parentCommunicationAddress;
    private String studentPermanentAddress;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_details_id")
    private List<StudentStayDetails> stayDetails;

    @Transient
    public String getStudentPresentAddress() {
        if (stayDetails == null || stayDetails.isEmpty()) {
            return null;
        }

        // Assuming the last element in the list is the most recent
        return stayDetails.getLast().getAddress();
    }

    @Transient
    public StayType getStudentPresentStayType() {
        if (stayDetails == null || stayDetails.isEmpty()) {
            return null;
        }

        // Assuming the last element in the list is the most recent
        return stayDetails.getLast().getStayType();
    }
}
