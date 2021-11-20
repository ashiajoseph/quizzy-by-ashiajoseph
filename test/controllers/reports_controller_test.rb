# frozen_string_literal: true

require "test_helper"

class ReportsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = @user.quizzes.create!(title: "Maths")
    @user_header = headers(@user)
  end

  def publish_quiz_and_create_attempt_record
    question = @quiz.questions.create!(
      question: "question",
      options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: false } ])
    quiz_params = { quiz: { title: "#{@quiz.title} Quiz", setslug: true } }
    put quiz_path(@quiz.id), params: quiz_params, headers: @user_header
    participant = User.create!(
      {
        first_name: "Eve", last_name: "Smith", email: "eve@example.com", password: "welcome",
        password_confirmation: "welcome"
      })
    @attempt = participant.attempts.create!(
      quiz_id: @quiz.id, submitted: true, correct_answers_count: 1,
      incorrect_answers_count: 0)
  end

  def test_report_not_generated_if_no_quiz_created
    Quiz.delete_all
    get "/generate_report", headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("no_quiz", entity: "created")
  end

  def test_report_not_generated_if_no_quiz_published
    get "/generate_report", headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("no_quiz", entity: "published")
  end

  def test_report_data_generation_for_valid_user
    publish_quiz_and_create_attempt_record()
    get "/generate_report", headers: @user_header
    assert_response :success
  end

  def test_report_data_generation_for_valid_user
    publish_quiz_and_create_attempt_record()
    get "/generate_report"
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.could_not_auth")
  end

  def test_export_return_job_id_for_valid_user
    publish_quiz_and_create_attempt_record()
    get "/export", headers: @user_header
    assert_response :success
    assert_not_equal response.parsed_body, nil
  end

  def test_export_not_invoked_for_invalid_user
    get "/export"
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.could_not_auth")
  end
end
