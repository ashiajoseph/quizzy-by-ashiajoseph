# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def show?
    quiz.user.id == user.id
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  def retrieve_title?
    show?
  end

  def create?
    true
  end
end
