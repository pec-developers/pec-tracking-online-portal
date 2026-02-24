package org.prathyushacampus.pectop.studentgeneralprofileservice.controller;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.InitialStudentProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileRequest;
import org.prathyushacampus.pectop.studentgeneralprofileservice.dto.StudentPublicProfileResponse;
import org.prathyushacampus.pectop.studentgeneralprofileservice.service.StudentProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/general-profile")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudentPublicProfileResponse addNewStudentPublicProfile(@RequestBody InitialStudentProfileRequest request) {
        return studentProfileService.addNewStudentPublicProfile(request);
    }

    @GetMapping("/{studentId}")
    @ResponseStatus(HttpStatus.OK)
    public StudentPublicProfileResponse getStudentPublicProfile(@PathVariable String studentId) {
        return studentProfileService.getStudentPublicProfile(studentId);
    }

    @PutMapping("/{studentId}")
    @ResponseStatus(HttpStatus.OK)
    public StudentPublicProfileResponse modifyStudentPublicProfile(@PathVariable String studentId,
            @RequestBody StudentPublicProfileRequest request) {
        return studentProfileService.modifyStudentPublicProfile(studentId, request);
    }

    @PutMapping("/{studentId}/father-image")
    @ResponseStatus(HttpStatus.OK)
    public StudentPublicProfileResponse uploadFatherImage(@PathVariable String studentId,
            @RequestParam("image") MultipartFile file) {
        return studentProfileService.uploadFatherImage(studentId, file);
    }

    @PutMapping("/{studentId}/mother-image")
    @ResponseStatus(HttpStatus.OK)
    public StudentPublicProfileResponse uploadMotherImage(@PathVariable String studentId,
            @RequestParam("image") MultipartFile file) {
        return studentProfileService.uploadMotherImage(studentId, file);
    }

    @PutMapping("/{studentId}/self-image")
    @ResponseStatus(HttpStatus.OK)
    public StudentPublicProfileResponse uploadSelfImage(@PathVariable String studentId,
            @RequestParam("image") MultipartFile file) {
        return studentProfileService.uploadSelfImage(studentId, file);
    }
}
