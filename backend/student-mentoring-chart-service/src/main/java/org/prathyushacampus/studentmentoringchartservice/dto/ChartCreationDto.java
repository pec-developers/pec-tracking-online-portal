package org.prathyushacampus.studentmentoringchartservice.dto;

import java.util.List;
import java.util.UUID;

public record ChartCreationDto(
        UUID studentId, int semester, int year, UUID classId,
        List<String> subjectCodeList, List<String> examsList,
        List<String> internalList) {
}
