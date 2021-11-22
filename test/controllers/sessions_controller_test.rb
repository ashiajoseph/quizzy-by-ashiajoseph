# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @participant = User.create!(
      first_name: "Eve", last_name: "Smith", email: "eve@example.com", password: "welcome",
      password_confirmation: "welcome")
  end

  def test_should_login_admin_with_valid_credentials
    post session_path, params: { login: { email: @admin.email, password: @admin.password } }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @admin.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    non_existent_email = "this_email_does_not_exist"
    post session_path, params: { login: { email: non_existent_email, password: "welcome" } }, as: :json

    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.incorrect_credentials")
  end

  def test_shouldnt_login_standard_user
    post session_path, params: { login: { email: @participant.email, password: @participant.password } }, as: :json
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.access_denied")
  end
end
