# frozen_string_literal: true

require "test_helper"

class QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = user.quizzes.create!(title: "Maths")
    @question = @quiz.questions.new(
      question: "question",
      options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: false } ])
  end
end
