package bhatt.aayush.Dashboard_survey.surveyComponents;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "data")
public class SurveyDataModel {
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	@Id
	private String id;
	private String fullName;
	private String dateOfBirth;
	private String gender;
	private String course;
	private double fees;
	private ArrayList<String> companies = new ArrayList<String>();
	private String about;

	
	public SurveyDataModel() {}


	public SurveyDataModel(String id,String fullName, String dateOfBirth, String gender, String course, double fees,
			ArrayList<String> companies, String about) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.course = course;
		this.fees = fees;
		this.companies = companies;
		this.about = about;
	}


	public String getFullName() {
		return fullName;
	}


	public void setFullName(String fullName) {
		this.fullName = fullName;
	}


	public String getDateOfBirth() {
		return dateOfBirth;
	}


	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getCourse() {
		return course;
	}


	public void setCourse(String course) {
		this.course = course;
	}


	public double getFees() {
		return fees;
	}


	public void setFees(double fees) {
		this.fees = fees;
	}


	public ArrayList<String> getCompanies() {
		return companies;
	}


	public void setCompanies(ArrayList<String> companies) {
		this.companies = companies;
	}


	public String getAbout() {
		return about;
	}


	public void setAbout(String about) {
		this.about = about;
	}
	
}

