package bhatt.aayush.Dashboard_survey.surveyComponents;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")	
@RequestMapping("/api/surveys")
public class SurveyController {

    private final SurveyService surveyService;

    @Autowired
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public ResponseEntity<SurveyDataModel> saveSurvey(@RequestBody SurveyDataModel survey) {
    	SurveyDataModel savedSurvey = surveyService.saveSurvey(survey);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSurvey);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyDataModel> getSurveyById(@PathVariable String id) {
        Optional<SurveyDataModel> survey = surveyService.getSurveyById(id);
        return survey.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<SurveyDataModel>> getAllSurveys() {
        List<SurveyDataModel> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SurveyDataModel> updateSurvey(@PathVariable String id, @RequestBody SurveyDataModel survey) {
        Optional<SurveyDataModel> updatedSurvey = surveyService.updateSurvey(id, survey);
        return updatedSurvey.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable String id) {
        boolean deleted = surveyService.deleteSurvey(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
