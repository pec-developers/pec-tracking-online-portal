# Update Student Public Profile API

This endpoint allows you to modify the existing public profile details of a student.

## Endpoint

`PUT /general-profile/{studentId}`

## Description

Updates the details of a student identified by their `studentId`. The request body should contain the fields that need to be updated.

## Request Parameters

### Path Parameters

| Parameter   | Type   | Required | Description                          |
| :---------- | :----- | :------- | :----------------------------------- |
| `studentId` | String | Yes      | The unique identifier of the student |

### Headers

| Header         | Value            |
| :------------- | :--------------- |
| `Content-Type` | `application/json` |

## Request Body

The request body accepts a JSON object representing the `StudentPublicProfileRequest`.

**Example JSON Payload:**

```json
{
    "academicDetails": {
        "name": "Arjun Ramesh Kumar",
        "registerNumber": "11142301CS04169",
        "admissionNumber": "ADM23026",
        "batchStart": 2021,
        "batchEnd": 2025,
        "branch": "Computer Science and Engineering",
        "section": "A"
    },
    "personalDetails": {
        "gender": "Male",
        "dateOfBirth": "2003-07-15",
        "nationality": "Indian",
        "state": "Tamil Nadu",
        "religion": "Hindu",
        "caste": "Mudaliar",
        "community": "BC",
        "bloodGroup": "O+",
        "phoneNumber": "9876501234",
        "email": "arjun.ramesh2021@pec.edu"
    },
    "familyDetails": {
        "father": {
            "name": "Ramesh Kumar",
            "education": "B.E. Mechanical Engineering",
            "occupation": "Senior Engineer",
            "contactNumber": "9876543210"
        },
        "mother": {
            "name": "Meena Ramesh",
            "education": "B.Sc. Mathematics",
            "occupation": "School Teacher",
            "contactNumber": "9876543211"
        },
        "siblings": [
            {
                "name": "Arun Kumar",
                "age": 15,
                "sex": "Male",
                "eduOrProfession": "High School Student"
            },
            {
                "name": "Priya Kumar",
                "age": 20,
                "sex": "Female",
                "eduOrProfession": "College Student"
            }
        ],
        "localGuardian": {
            "name": "Suresh Mudaliar",
            "contactNumber": "9876543212",
            "address": "12, Gandhi Nagar, Pondicherry - 605001"
        }
    },
    "addressDetails": {
        "parentCommunicationAddress": "45, Anna Street, Villupuram, Tamil Nadu - 605602",
        "studentPermanentAddress": "45, Anna Street, Villupuram, Tamil Nadu - 605602",
        "stayDetails": [
            {
                "academicYear": 1,
                "stayType": "HOSTEL",
                "address": "Room 101, College Hostel",
                "fellowMates": [
                    {
                        "name": "Karthik Selvam",
                        "age": 20,
                        "gender": "Male",
                        "contactNumber": "9123456780"
                    },
                    {
                        "name": "Vijay Anand",
                        "age": 22,
                        "gender": "Male",
                        "contactNumber": "9123456781"
                    }
                ]
            },
            {
                "academicYear": 2,
                "stayType": "OWN_ACCOMMODATION_FRIENDS",
                "address": "Flat 5B, Sunshine Apartments",
                "fellowMates": [
                    {
                        "name": "Deepa Krishnan",
                        "age": 21,
                        "gender": "Female",
                        "contactNumber": "9123456782"
                    }
                ]
            }
        ]
    },
    "academicHistory": {
        "isLateralEntry": false,
        "hscDetails": {
            "schoolName": "ABC Higher Secondary School",
            "board": "State Board",
            "medium": "English",
            "scoredMark": 1100,
            "totalMark": 1200
        },
        "sslcInterDetails": {
            "schoolName": "XYZ Matriculation School",
            "board": "State Board",
            "medium": "English",
            "mathMark": 98,
            "phyMark": 95,
            "chemMark": 92,
            "csBioMark": 96
        }
    },
    "miscDetails": {
        "motherTongue": "Tamil",
        "otherKnownLanguages": [
            "English",
            "Hindi"
        ],
        "modeOfAdmission": "COUNSELING",
        "dietaryPreference": "VEG",
        "visionProblem": false,
        "chronicIllness": "None"
    },
    "socioEconomicDetails": {
        "fatherAnnualIncome": 1200000,
        "motherAnnualIncome": 600000,
        "otherIncomeSource": "None",
        "partTimeJob": "None",
        "scholarship": "Merit Scholarship",
        "otherFinancialAssistance": "None"
    },
    "ambitionDetails": {
        "personalAmbition": {
            "longTermGoals": "To become a successful software architect at a leading tech company",
            "longTermGoalPlan": "Complete B.E. with distinction, pursue M.Tech in AI/ML, and gain industry experience through internships"
        },
        "careerPlan": {
            "careerChoices": [
                "JOB",
                "HIGHER_STUDIES"
            ],
            "careerPrepPlan": "I plan to take online courses and build a portfolio.",
            "extraCoachingDetails": "Attending weekend workshops for advanced Java.",
            "helpNeeded": "Guidance on resume building."
        },
        "selfAnalysis": {
            "academicStrength": "Quick learner with strong analytical skills",
            "generalStrength": "Public speaking and team collaboration",
            "academicWeakness": "Tendency to spend too much time perfecting solutions",
            "generalWeakness": "Sometimes overthink decisions under pressure"
        },
        "livingStyle": {
            "yourCommunicationToParent": "WEEKLY",
            "parentCommunicationToYou": "DAILY",
            "weekendPlans": "Visit library, play cricket with friends, and work on personal coding projects",
            "roommatesDescription": "Friendly and studious roommates who maintain a good study environment",
            "hostelEnvironmentDescription": "Clean and well-maintained hostel with good facilities and cooperative wardens"
        },
        "generalAcademicDetails": {
            "branchFeedback": "Data Structures and Algorithms are the most interesting subjects",
            "fundamentalMathStrength": "STRONG",
            "fundamentalEnggStrength": "AVERAGE",
            "questioningCapability": true,
            "sportsInvolvement": "Cricket - College team member",
            "awardRecognitions": "Best Outgoing Student - Class 12, Hackathon Runner-up 2022"
        }
    }
}
```

> **Note:** The specific fields available depend on the `StudentPublicProfileRequest` DTO definition.

## Response

Returns the updated `StudentPublicProfileResponse` object.

### Success Response (200 OK)

```json
{
    "studentId": "43345805-947b-4361-a6ba-9be64b354580",
    "academicDetails": {
        "imageUrl": null,
        "name": "Arjun Ramesh Kumar",
        "registerNumber": "21CS101",
        "admissionNumber": "ADM2021001",
        "batchStart": 2021,
        "batchEnd": 2025,
        "branch": "Computer Science and Engineering",
        "section": "A"
    },
    "personalDetails": {
        "gender": "Male",
        "dateOfBirth": "2003-07-15",
        "age": null,
        "nationality": "Indian",
        "state": "Tamil Nadu",
        "religion": "Hindu",
        "caste": "Mudaliar",
        "community": "BC",
        "bloodGroup": "O+",
        "phoneNumber": "9876501234",
        "email": "arjun.ramesh2021@pec.edu"
    },
    "familyDetails": {
        "father": {
            "imageUrl": null,
            "name": "Ramesh Kumar",
            "education": "B.E. Mechanical Engineering",
            "occupation": "Senior Engineer",
            "contactNumber": "9876543210"
        },
        "mother": {
            "imageUrl": null,
            "name": "Meena Ramesh",
            "education": "B.Sc. Mathematics",
            "occupation": "School Teacher",
            "contactNumber": "9876543211"
        },
        "siblings": [
            {
                "name": "Arun Kumar",
                "age": 15,
                "sex": "Male",
                "eduOrProfession": "High School Student"
            },
            {
                "name": "Priya Kumar",
                "age": 20,
                "sex": "Female",
                "eduOrProfession": "College Student"
            }
        ],
        "localGuardian": {
            "name": "Suresh Mudaliar",
            "contactNumber": "9876543212",
            "address": "12, Gandhi Nagar, Pondicherry - 605001"
        }
    },
    "addressDetails": {
        "parentCommunicationAddress": "45, Anna Street, Villupuram, Tamil Nadu - 605602",
        "studentPermanentAddress": "45, Anna Street, Villupuram, Tamil Nadu - 605602",
        "stayDetails": [
            {
                "academicYear": 1,
                "stayType": "HOSTEL",
                "address": "Room 101, College Hostel",
                "fellowMates": [
                    {
                        "name": "Karthik Selvam",
                        "age": 20,
                        "gender": "Male",
                        "contactNumber": "9123456780"
                    },
                    {
                        "name": "Vijay Anand",
                        "age": 22,
                        "gender": "Male",
                        "contactNumber": "9123456781"
                    }
                ]
            },
            {
                "academicYear": 2,
                "stayType": "OWN_ACCOMMODATION_FRIENDS",
                "address": "Flat 5B, Sunshine Apartments",
                "fellowMates": [
                    {
                        "name": "Deepa Krishnan",
                        "age": 21,
                        "gender": "Female",
                        "contactNumber": "9123456782"
                    }
                ]
            }
        ],
        "studentPresentAddress": "Flat 5B, Sunshine Apartments",
        "studentPresentStayType": "OWN_ACCOMMODATION_FRIENDS"
    },
    "academicHistory": {
        "isLateralEntry": false,
        "hscDetails": {
            "schoolName": "ABC Higher Secondary School",
            "board": "State Board",
            "medium": "English",
            "scoredMark": 1100,
            "totalMark": 1200
        },
        "sslcInterDetails": {
            "schoolName": "XYZ Matriculation School",
            "board": "State Board",
            "medium": "English",
            "mathMark": 98,
            "phyMark": 95,
            "chemMark": 92,
            "csBioMark": 96,
            "cutoffMark": 191.5
        },
        "diplomaDetails": null
    },
    "miscDetails": {
        "motherTongue": "Tamil",
        "otherKnownLanguages": [
            "English",
            "Hindi"
        ],
        "modeOfAdmission": "COUNSELING",
        "dietaryPreference": "VEG",
        "visionProblem": false,
        "chronicIllness": "None"
    },
    "socioEconomicDetails": {
        "fatherAnnualIncome": 1200000,
        "motherAnnualIncome": 600000,
        "otherIncomeSource": "None",
        "partTimeJob": "None",
        "scholarship": "Merit Scholarship",
        "otherFinancialAssistance": "None"
    },
    "ambitionDetails": {
        "personalAmbition": {
            "longTermGoals": "To become a successful software architect at a leading tech company",
            "longTermGoalPlan": "Complete B.E. with distinction, pursue M.Tech in AI/ML, and gain industry experience through internships"
        },
        "careerPlan": {
            "careerChoices": [
                "JOB",
                "HIGHER_STUDIES"
            ],
            "careerPrepPlan": "I plan to take online courses and build a portfolio.",
            "extraCoachingDetails": "Attending weekend workshops for advanced Java.",
            "helpNeeded": "Guidance on resume building."
        },
        "selfAnalysis": {
            "academicStrength": "Quick learner with strong analytical skills",
            "generalStrength": "Public speaking and team collaboration",
            "academicWeakness": "Tendency to spend too much time perfecting solutions",
            "generalWeakness": "Sometimes overthink decisions under pressure"
        },
        "livingStyle": {
            "yourCommunicationToParent": "WEEKLY",
            "parentCommunicationToYou": "DAILY",
            "weekendPlans": "Visit library, play cricket with friends, and work on personal coding projects",
            "roommatesDescription": null,
            "hostelEnvironmentDescription": null
        },
        "generalAcademicDetails": {
            "branchFeedback": "Data Structures and Algorithms are the most interesting subjects",
            "fundamentalMathStrength": "STRONG",
            "fundamentalEnggStrength": "AVERAGE",
            "questioningCapability": true,
            "sportsInvolvement": "Cricket - College team member",
            "awardRecognitions": "Best Outgoing Student - Class 12, Hackathon Runner-up 2022"
        }
    }
}
```
