package bhatt.aayush.Dashboard_survey.surveyComponents;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    private final SurveyDataRepository surveyDataRepository;

    @Autowired
    public SurveyService(SurveyDataRepository surveyRepository) {
        this.surveyDataRepository = surveyRepository;
    }

    public SurveyDataModel saveSurvey(SurveyDataModel survey) {
        return surveyDataRepository.save(survey);
    }

    public Optional<SurveyDataModel> getSurveyById(String id) {
        return surveyDataRepository.findById(id);
    }

    public List<SurveyDataModel> getAllSurveys() {
        return surveyDataRepository.findAll();
    }

    public Optional<SurveyDataModel> updateSurvey(String id, SurveyDataModel survey) {
        Optional<SurveyDataModel> existingSurvey = surveyDataRepository.findById(id);
        if (existingSurvey.isPresent()) {
            survey.setId(id);
            return Optional.of(surveyDataRepository.save(survey));
        }
        return Optional.empty();
    }

    public boolean deleteSurvey(String id) {
        Optional<SurveyDataModel> existingSurvey = surveyDataRepository.findById(id);
        if (existingSurvey.isPresent()) {
            surveyDataRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
