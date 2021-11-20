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
    get "/generate_report", headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("no_quiz", entity: "created")
  end

  def test_report_not_generated_if_no_quiz_published
    get "/generate_report", headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("no_quiz", entity: "published")
  end
end
