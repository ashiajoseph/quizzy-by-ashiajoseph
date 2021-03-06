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

  def test_report_not_generated_if_no_quiz_created
    Quiz.delete_all
    get "/reports/generate_report", headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("no_quiz", entity: "created")
  end

  def test_report_not_generated_if_no_quiz_published
    get "/reports/generate_report", headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("no_quiz", entity: "published")
  end

  def test_report_data_generated_for_valid_user
    publish_quiz_and_create_attempt_record()
    get "/reports/generate_report", headers: @user_header
    assert_response :success
    records = Attempt.where(submitted: true, quiz_id: @user.quizzes)
    assert_equal response.parsed_body["report_data"].size, records.size
  end

  def test_report_data_not_generated_for_valid_user
    publish_quiz_and_create_attempt_record()
    get "/reports/generate_report"
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.could_not_auth")
  end

  def test_export_not_invoked_for_invalid_user
    get "/reports/export"
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.could_not_auth")
  end

  private

    def publish_quiz_and_create_attempt_record
      question = @quiz.questions.create!(
        question: "question",
        options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: false } ])
      put "/quizzes/#{@quiz.id}/publish", headers: @user_header
      participant = User.create!(
        {
          first_name: "Eve", last_name: "Smith", email: "eve@example.com", password: "welcome",
          password_confirmation: "welcome"
        })
      @attempt = participant.attempts.create!(
        quiz_id: @quiz.id, submitted: true, correct_answers_count: 1,
        incorrect_answers_count: 0)
    end
end
