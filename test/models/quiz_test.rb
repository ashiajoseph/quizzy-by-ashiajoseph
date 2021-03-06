# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = @user.quizzes.new(title: "Maths")
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_quiz_should_not_be_valid_and_saved_without_title
    @quiz.title = ""
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Title can't be blank"
  end

  def test_quiz_title_should_not_exceed_maximum_length
    @quiz.title = "m" * 126
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Title is too long (maximum is 125 characters)"
  end

  def test_quiz_should_not_be_valid_without_user
    @quiz.user = nil
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "User must exist"
  end

  def test_error_raised_for_duplicate_slug
    another_quiz = Quiz.new(title: "Mathematics", user_id: @user.id)
    assert_raises ActiveRecord::RecordInvalid do
      another_quiz.update!(slug: @quiz.slug)
    end
  end
end
