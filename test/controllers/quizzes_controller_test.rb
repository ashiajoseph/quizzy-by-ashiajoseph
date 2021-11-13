# frozen_string_literal: true

require "test_helper"

class QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
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
    quiz_params = { quiz: { title: new_title, setslug: nil } }
    put quiz_path(@quiz.id), params: quiz_params, headers: @user_header
    assert_response :success
    @quiz.reload
    assert_equal @quiz.title, new_title
  end

  def test_shouldnt_update_quiz_without_title
    quiz_params = { quiz: { title: "", setslug: nil } }
    put quiz_path(@quiz.id), params: quiz_params, headers: @user_header
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_should_add_slug_on_publishing_quiz
    slug = Quiz.set_slug(@quiz.title)
    quiz_params = { quiz: { title: @quiz.title, setslug: true } }
    put quiz_path(@quiz.id), params: quiz_params, headers: @user_header
    assert_response :success
    @quiz.reload
    assert_equal @quiz.slug, slug
  end

  def test_will_not_add_duplicate_slug_to_quiz
    put quiz_path(@quiz.id), params: { quiz: { title: @quiz.title, setslug: true } }, headers: @user_header

    quiz2 = @user.quizzes.create!(title: "Maths")
    put quiz_path(quiz2.id), params: { quiz: { title: quiz2.title, setslug: true } }, headers: @user_header
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

  def test_not_found_error_raised_for_invalid_id
    invalid_id = 100
    get quiz_path(invalid_id), headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Quiz")
    end
end
