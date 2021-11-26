# frozen_string_literal: true

require "test_helper"

class QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @another_user = User.create!(
      first_name: "Ann", last_name: "Smith", email: "ann@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = @user.quizzes.create!(title: "Maths")
    @user_header = headers(@user)
  end

  def test_should_list_all_quizzes_for_valid_user
    get quizzes_path, headers: @user_header
    assert_response :success
    response_body = response.parsed_body
    quiz_list = response_body["quizzes"]
    assert_equal quiz_list.length, @user.quizzes.length
  end

  def test_should_create_valid_quiz
    post quizzes_path, params: { quiz: { title: "Solar System" } }, headers: @user_header
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created")
  end

  def test_shouldnt_create_quiz_without_title
    post quizzes_path, params: { quiz: { title: "" } },
      headers:  @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_should_update_quiz_title
    new_title = "Mathematics"
    quiz_params = { quiz: { title: new_title } }
    put quiz_path(@quiz.id), params: quiz_params, headers: @user_header
    assert_response :success
    @quiz.reload
    assert_equal @quiz.title, new_title
  end

  def test_shouldnt_update_quiz_without_title
    quiz_params = { quiz: { title: "" } }
    put quiz_path(@quiz.id), params: quiz_params, headers: @user_header
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_should_add_slug_on_publishing_quiz
    slug_candidate = @quiz.set_slug
    put "/quizzes/#{@quiz.id}/publish", headers: @user_header
    assert_response :success
    @quiz.reload
    assert_equal @quiz.slug, slug_candidate
  end

  def test_will_not_add_duplicate_slug_to_quiz
    put "/quizzes/#{@quiz.id}/publish", headers: @user_header
    assert_response :success
    quiz2 = @user.quizzes.create!(title: "Maths")
    put "/quizzes/#{quiz2.id}/publish", headers: @user_header
    assert_response :success
    @quiz.reload
    quiz2.reload
    assert_not_equal @quiz.slug, quiz2.slug
  end

  def test_should_destroy_quiz
    assert_difference "Quiz.count", -1 do
      delete quiz_path(@quiz.id), headers: @user_header
    end
    assert_response :ok
  end

  def test_not_found_error_raised_for_invalid_quiz_id
    invalid_id = 100
    get quiz_path(invalid_id), headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Quiz")
  end

  def test_check_slug_works_on_given_valid_slug
    put "/quizzes/#{@quiz.id}/publish", headers: @user_header
    assert_response :success
    @quiz.reload
    get "/quizzes/#{@quiz.slug}/check_slug"
    assert_response :success
    assert_equal response.parsed_body, { "id" => @quiz.id, "title" => @quiz.title }
  end

  def test_check_slug_raise_not_found_error_on_given_invalid_slug
    get "/quizzes/invalid/check_slug"
    assert_response :not_found
    assert_includes response.parsed_body["error"], "Quiz not found."
  end

  def test_retrieve_title
    get "/quizzes/#{@quiz.id}/retrieve_title", headers: @user_header
    assert_response :success
    assert_equal response.parsed_body, { "id" => @quiz.id, "title" => @quiz.title }
  end

  def test_shouldnt_show_quiz_to_unauthorized_user
    another_user_header = headers(@another_user)
    get quiz_path(@quiz.id), headers: another_user_header
    assert_response :forbidden
    assert_equal response.parsed_body["error"], "Unauthorized Access"
  end
end
